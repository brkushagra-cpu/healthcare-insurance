// Risk Scoring Engine — Enterprise-grade actuarial risk assessment
// Inspired by UHC/Optum risk stratification models

const RISK_FACTORS = {
  age: { weight: 0.30, brackets: [[18,25,0.7],[26,35,0.85],[36,45,1.0],[46,55,1.3],[56,65,1.6],[66,100,2.0]] },
  smoking: { weight: 0.20, values: { never: 0.8, former: 1.2, current: 1.8 } },
  bmi: { weight: 0.15, brackets: [[0,18.5,1.1],[18.5,25,0.8],[25,30,1.1],[30,35,1.4],[35,100,1.8]] },
  familyHistory: { weight: 0.10, values: { none: 0.8, minor: 1.0, major: 1.4 } },
  preExisting: { weight: 0.15, values: { none: 0.7, managed: 1.2, active: 1.8 } },
  occupation: { weight: 0.10, values: { desk: 0.8, field: 1.0, hazardous: 1.5 } }
};

export function calculateRiskScore(profile) {
  let totalScore = 0;

  // Age factor
  const ageFactor = RISK_FACTORS.age;
  const ageBracket = ageFactor.brackets.find(([min, max]) => profile.age >= min && profile.age <= max);
  totalScore += (ageBracket ? ageBracket[2] : 1.0) * ageFactor.weight;

  // Smoking
  const smokingVal = RISK_FACTORS.smoking.values[profile.smoking || 'never'] || 1.0;
  totalScore += smokingVal * RISK_FACTORS.smoking.weight;

  // BMI
  const bmi = profile.bmi || 22;
  const bmiBracket = RISK_FACTORS.bmi.brackets.find(([min, max]) => bmi >= min && bmi < max);
  totalScore += (bmiBracket ? bmiBracket[2] : 1.0) * RISK_FACTORS.bmi.weight;

  // Family history
  const famVal = RISK_FACTORS.familyHistory.values[profile.familyHistory || 'none'] || 1.0;
  totalScore += famVal * RISK_FACTORS.familyHistory.weight;

  // Pre-existing
  const preVal = RISK_FACTORS.preExisting.values[profile.preExisting || 'none'] || 1.0;
  totalScore += preVal * RISK_FACTORS.preExisting.weight;

  // Occupation
  const occVal = RISK_FACTORS.occupation.values[profile.occupation || 'desk'] || 1.0;
  totalScore += occVal * RISK_FACTORS.occupation.weight;

  // Normalize to 0-100 scale (0.7 min → 2.0 max maps to ~35-100)
  const normalized = Math.round(Math.min(100, Math.max(0, ((totalScore - 0.7) / 1.3) * 100)));
  
  let tier, recommendation;
  if (normalized <= 30) { tier = 'Preferred'; recommendation = 'Eligible for premium discounts and enhanced benefits.'; }
  else if (normalized <= 55) { tier = 'Standard'; recommendation = 'Standard underwriting. All plan tiers available.'; }
  else if (normalized <= 75) { tier = 'Substandard'; recommendation = 'May require additional documentation. Limited plan options.'; }
  else { tier = 'Decline/Refer'; recommendation = 'Manual review required by underwriting team.'; }

  return {
    score: normalized,
    tier,
    recommendation,
    factors: {
      age: Math.round((ageBracket ? ageBracket[2] : 1.0) * 100) / 100,
      lifestyle: Math.round(smokingVal * 100) / 100,
      health: Math.round(((bmiBracket ? bmiBracket[2] : 1.0) + preVal) / 2 * 100) / 100,
      history: Math.round(famVal * 100) / 100
    }
  };
}

export function calculatePremium(profile, basePremium = 12000) {
  const risk = calculateRiskScore(profile);
  const coverageMultiplier = (profile.coverage || 500000) / 500000;
  const memberMultiplier = Math.max(1, (profile.members || 1) * 0.7);
  
  const premium = Math.round(basePremium * (risk.score / 50) * coverageMultiplier * memberMultiplier);
  
  return {
    annual: premium,
    monthly: Math.round(premium / 12),
    quarterly: Math.round(premium / 4),
    risk
  };
}
