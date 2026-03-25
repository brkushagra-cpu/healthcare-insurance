import express from 'express';
import { calculateRiskScore, calculatePremium } from '../services/riskEngine.js';

const router = express.Router();

// POST /api/v1/risk/assess — Full risk assessment
router.post('/assess', (req, res) => {
  try {
    const { age, smoking, bmi, familyHistory, preExisting, occupation, coverage, members } = req.body;
    
    if (!age) return res.status(400).json({ status: 'error', error: { message: 'Age is required' } });

    const riskResult = calculateRiskScore({ age, smoking, bmi, familyHistory, preExisting, occupation });
    const premiumResult = calculatePremium({ age, smoking, bmi, familyHistory, preExisting, occupation, coverage, members });

    res.json({
      status: 'success',
      data: {
        risk: riskResult,
        premium: premiumResult,
        eligibility: {
          autoApproval: riskResult.score <= 55,
          requiresReview: riskResult.score > 55 && riskResult.score <= 75,
          declined: riskResult.score > 75
        }
      }
    });
  } catch (err) {
    res.status(500).json({ status: 'error', error: { message: err.message } });
  }
});

// POST /api/v1/risk/quick-score — Lightweight scoring for UI
router.post('/quick-score', (req, res) => {
  try {
    const result = calculateRiskScore(req.body);
    res.json({ status: 'success', data: result });
  } catch (err) {
    res.status(500).json({ status: 'error', error: { message: err.message } });
  }
});

// GET /api/v1/risk/factors — Returns available risk factors for UI dropdowns
router.get('/factors', (req, res) => {
  res.json({
    status: 'success',
    data: {
      smoking: ['never', 'former', 'current'],
      familyHistory: ['none', 'minor', 'major'],
      preExisting: ['none', 'managed', 'active'],
      occupation: ['desk', 'field', 'hazardous'],
      coverageOptions: [500000, 1000000, 2500000, 5000000]
    }
  });
});

export default router;
