import express from 'express';

const router = express.Router();

// Full plan database across insurers
const ALL_PLANS = [
  // HDFC Ergo
  { id: 'hdfc-1', insurer: 'HDFC Ergo', name: 'Optima Secure', type: 'Health', premium: 8499, coverage: 500000, claimRatio: 92, cashlessHospitals: 10000, features: ['No room rent cap', 'Day-1 coverage', 'Free health checkup', 'No co-pay'], waitingPeriod: '30 days', renewalBonus: '50%', rating: 4.5 },
  { id: 'hdfc-2', insurer: 'HDFC Ergo', name: 'Optima Restore', type: 'Health', premium: 12999, coverage: 1000000, claimRatio: 94, cashlessHospitals: 10000, features: ['Sum restore 100%', 'Intl coverage', 'OPD cover', 'Mental health cover'], waitingPeriod: '30 days', renewalBonus: '50%', rating: 4.7 },
  // ICICI Lombard
  { id: 'icici-1', insurer: 'ICICI Lombard', name: 'Complete Health', type: 'Health', premium: 7999, coverage: 500000, claimRatio: 88, cashlessHospitals: 6500, features: ['Wellness rewards', 'Annual checkup', 'Ambulance cover', 'Daycare procedures'], waitingPeriod: '30 days', renewalBonus: '20%', rating: 4.2 },
  { id: 'icici-2', insurer: 'ICICI Lombard', name: 'iHealth Plus', type: 'Health', premium: 15499, coverage: 2500000, claimRatio: 90, cashlessHospitals: 6500, features: ['Sum restore', 'Global coverage', 'OPD included', 'Organ donor cover'], waitingPeriod: '15 days', renewalBonus: '35%', rating: 4.4 },
  // Star Health
  { id: 'star-1', insurer: 'Star Health', name: 'Comprehensive', type: 'Health', premium: 9200, coverage: 500000, claimRatio: 85, cashlessHospitals: 12000, features: ['12,000+ network', 'Maternity cover', 'Newborn cover', 'AYUSH treatment'], waitingPeriod: '30 days', renewalBonus: '25%', rating: 4.3 },
  { id: 'star-2', insurer: 'Star Health', name: 'Family Assure', type: 'Health', premium: 18500, coverage: 2500000, claimRatio: 87, cashlessHospitals: 12000, features: ['Unlimited restore', 'Air ambulance', 'Domiciliary hospitalization', 'Bariatric surgery'], waitingPeriod: '30 days', renewalBonus: '50%', rating: 4.6 },
  // Bajaj Allianz
  { id: 'bajaj-1', insurer: 'Bajaj Allianz', name: 'Health Guard', type: 'Health', premium: 6899, coverage: 500000, claimRatio: 90, cashlessHospitals: 7500, features: ['Lowest premium', 'Recharge benefit', 'Road ambulance', 'Tax savings 80D'], waitingPeriod: '30 days', renewalBonus: '10%', rating: 4.1 },
  { id: 'bajaj-2', insurer: 'Bajaj Allianz', name: 'Health Infinity', type: 'Health', premium: 22000, coverage: 5000000, claimRatio: 91, cashlessHospitals: 7500, features: ['Unlimited sum insured', 'Global cover', 'OPD expenses', 'Mental wellness'], waitingPeriod: '15 days', renewalBonus: '50%', rating: 4.8 },
  // Max Bupa (Niva Bupa)
  { id: 'max-1', insurer: 'Niva Bupa', name: 'Health Companion', type: 'Health', premium: 8200, coverage: 500000, claimRatio: 86, cashlessHospitals: 8500, features: ['Preferred hospital network', 'Wellness coaching', 'Chronic management', 'Preventive care'], waitingPeriod: '30 days', renewalBonus: '30%', rating: 4.3 },
  // Tata AIG
  { id: 'tata-1', insurer: 'Tata AIG', name: 'Medicare Premier', type: 'Health', premium: 11500, coverage: 1000000, claimRatio: 89, cashlessHospitals: 9000, features: ['Worldwide emergency', 'Organ transplant', 'Advanced treatments', 'No sub-limits'], waitingPeriod: '30 days', renewalBonus: '40%', rating: 4.5 },
];

// GET /api/v1/compare — Get all plans for comparison
router.get('/', (req, res) => {
  const { type, minCoverage, maxPremium, insurer, sort } = req.query;
  let plans = [...ALL_PLANS];
  
  if (type) plans = plans.filter(p => p.type === type);
  if (insurer) plans = plans.filter(p => p.insurer === insurer);
  if (minCoverage) plans = plans.filter(p => p.coverage >= +minCoverage);
  if (maxPremium) plans = plans.filter(p => p.premium <= +maxPremium);
  
  if (sort === 'premium') plans.sort((a, b) => a.premium - b.premium);
  else if (sort === 'coverage') plans.sort((a, b) => b.coverage - a.coverage);
  else if (sort === 'rating') plans.sort((a, b) => b.rating - a.rating);
  else if (sort === 'claim') plans.sort((a, b) => b.claimRatio - a.claimRatio);
  
  res.json({ status: 'success', data: { plans, total: plans.length, insurers: [...new Set(ALL_PLANS.map(p => p.insurer))] } });
});

// POST /api/v1/compare/recommend — AI-powered recommendation
router.post('/recommend', (req, res) => {
  const { age, members, budget, priorities } = req.body;
  let plans = [...ALL_PLANS];
  
  // Score each plan based on user priorities
  const scored = plans.map(plan => {
    let score = 0;
    // Budget fit
    score += plan.premium <= (budget || 15000) ? 30 : plan.premium <= (budget || 15000) * 1.3 ? 15 : 0;
    // Claim ratio
    score += plan.claimRatio * 0.3;
    // Rating
    score += plan.rating * 5;
    // Hospital network
    score += Math.min(plan.cashlessHospitals / 500, 20);
    // Priority scoring
    if (priorities?.includes('low-premium')) score += plan.premium < 10000 ? 15 : 0;
    if (priorities?.includes('high-coverage')) score += plan.coverage >= 1000000 ? 15 : 0;
    if (priorities?.includes('best-hospitals')) score += plan.cashlessHospitals >= 10000 ? 15 : 0;
    if (priorities?.includes('high-claim-ratio')) score += plan.claimRatio >= 90 ? 15 : 0;
    
    return { ...plan, aiScore: Math.round(score * 10) / 10 };
  });
  
  scored.sort((a, b) => b.aiScore - a.aiScore);
  
  res.json({
    status: 'success',
    data: {
      recommended: scored[0],
      topPicks: scored.slice(0, 3),
      allResults: scored
    }
  });
});

export default router;
