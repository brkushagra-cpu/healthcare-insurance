import express from 'express';
const router = express.Router();

// Mock user policies
const USER_POLICIES = [
  {
    id: 'POL-2026-001', insurer: 'HDFC Ergo', plan: 'Optima Restore', type: 'Health',
    status: 'Active', premium: 12999, coverage: 1000000, startDate: '2026-01-15', endDate: '2027-01-14',
    members: [{ name: 'Rahul Sharma', relation: 'Self', age: 30 }, { name: 'Priya Sharma', relation: 'Spouse', age: 28 }],
    nextPayment: '2026-07-15', autoRenew: true,
    documents: [{ name: 'Policy Document', type: 'pdf' }, { name: 'Health Card', type: 'pdf' }, { name: 'Tax Certificate', type: 'pdf' }]
  },
  {
    id: 'POL-2026-002', insurer: 'ICICI Lombard', plan: 'iHealth Plus', type: 'Health',
    status: 'Active', premium: 15499, coverage: 2500000, startDate: '2025-11-01', endDate: '2026-10-31',
    members: [{ name: 'Rahul Sharma', relation: 'Self', age: 30 }],
    nextPayment: '2026-05-01', autoRenew: false,
    documents: [{ name: 'Policy Document', type: 'pdf' }, { name: 'E-Card', type: 'pdf' }]
  },
  {
    id: 'POL-2025-003', insurer: 'Star Health', plan: 'Comprehensive', type: 'Health',
    status: 'Expired', premium: 9200, coverage: 500000, startDate: '2024-06-01', endDate: '2025-05-31',
    members: [{ name: 'Rahul Sharma', relation: 'Self', age: 30 }],
    nextPayment: null, autoRenew: false,
    documents: [{ name: 'Policy Document', type: 'pdf' }]
  },
];

// Mock claims with timeline tracking
const USER_CLAIMS = [
  {
    id: 'CLM-2026-A1', policyId: 'POL-2026-001', type: 'Cashless', hospital: 'Max Super Speciality',
    amount: 145000, status: 'Approved', filedDate: '2026-03-10', settledDate: '2026-03-11',
    timeline: [
      { step: 'Filed', date: '2026-03-10 09:30', status: 'completed', detail: 'Claim submitted via Eptain portal' },
      { step: 'Document Verification', date: '2026-03-10 10:15', status: 'completed', detail: 'AI verified: all documents valid' },
      { step: 'Pre-Authorization', date: '2026-03-10 11:00', status: 'completed', detail: 'Hospital pre-auth approved by HDFC Ergo' },
      { step: 'Treatment', date: '2026-03-10 14:00', status: 'completed', detail: 'Cashless treatment at Max Hospital' },
      { step: 'Approved', date: '2026-03-11 09:00', status: 'completed', detail: '₹1,45,000 settled directly to hospital' },
      { step: 'Closed', date: '2026-03-11 10:00', status: 'completed', detail: 'Claim closed. NCB preserved.' },
    ]
  },
  {
    id: 'CLM-2026-B2', policyId: 'POL-2026-001', type: 'Reimbursement', hospital: 'Apollo Hospitals',
    amount: 28500, status: 'In Review', filedDate: '2026-03-22',
    timeline: [
      { step: 'Filed', date: '2026-03-22 14:00', status: 'completed', detail: 'Claim submitted with 3 documents' },
      { step: 'Document Verification', date: '2026-03-22 15:30', status: 'completed', detail: 'AI verified: awaiting 1 additional document' },
      { step: 'Under Review', date: '2026-03-23 10:00', status: 'active', detail: 'Claim assessor assigned — estimated 24 hrs' },
      { step: 'Amount Settlement', date: null, status: 'pending', detail: 'Pending review completion' },
      { step: 'Payout', date: null, status: 'pending', detail: 'Direct bank transfer within 48 hours' },
    ]
  },
];

// GET /api/v1/user/policies
router.get('/policies', (req, res) => {
  const active = USER_POLICIES.filter(p => p.status === 'Active');
  const totalCoverage = active.reduce((s, p) => s + p.coverage, 0);
  const totalPremium = active.reduce((s, p) => s + p.premium, 0);
  res.json({
    status: 'success',
    data: {
      policies: USER_POLICIES,
      summary: { active: active.length, total: USER_POLICIES.length, totalCoverage, totalPremium, nextRenewal: '2026-05-01' }
    }
  });
});

// GET /api/v1/user/claims
router.get('/claims', (req, res) => {
  res.json({
    status: 'success',
    data: {
      claims: USER_CLAIMS,
      summary: { total: USER_CLAIMS.length, approved: 1, inReview: 1, totalSettled: 145000 }
    }
  });
});

// GET /api/v1/user/claims/:id
router.get('/claims/:id', (req, res) => {
  const claim = USER_CLAIMS.find(c => c.id === req.params.id);
  if (!claim) return res.status(404).json({ status: 'error', message: 'Claim not found' });
  res.json({ status: 'success', data: claim });
});

// Premium calculator
router.post('/calculator/premium', (req, res) => {
  const { age = 30, coverage = 500000, members = 1, type = 'Health', tenure = 1, riders = [] } = req.body;
  const baseRate = type === 'Health' ? 0.018 : type === 'Life' ? 0.008 : 0.025;
  const ageFactor = age < 25 ? 0.8 : age < 35 ? 1.0 : age < 45 ? 1.4 : age < 55 ? 2.0 : 3.0;
  const memberFactor = 1 + (members - 1) * 0.45;
  const tenureFactor = tenure === 2 ? 0.92 : tenure === 3 ? 0.85 : 1.0;
  let premium = Math.round(coverage * baseRate * ageFactor * memberFactor * tenureFactor);
  const riderCost = riders.length * Math.round(premium * 0.08);
  const gst = Math.round((premium + riderCost) * 0.18);
  res.json({
    status: 'success',
    data: {
      basePremium: premium, riderCost, gst, totalPremium: premium + riderCost + gst,
      perMonth: Math.round((premium + riderCost + gst) / 12),
      taxBenefit80D: Math.min(premium + riderCost + gst, age >= 60 ? 50000 : 25000),
      breakdown: { base: premium, riders: riderCost, tax: gst }
    }
  });
});

// Tax calculator
router.post('/calculator/tax', (req, res) => {
  const { premium = 12000, age = 30, parentsPremium = 0, parentsAge = 55, regime = 'old' } = req.body;
  const selfLimit = age >= 60 ? 50000 : 25000;
  const parentLimit = parentsAge >= 60 ? 50000 : 25000;
  const selfDeduction = Math.min(premium, selfLimit);
  const parentDeduction = Math.min(parentsPremium, parentLimit);
  const totalDeduction = selfDeduction + parentDeduction;
  const taxRate = regime === 'old' ? 0.3 : 0.25;
  const taxSaved = Math.round(totalDeduction * taxRate);
  res.json({
    status: 'success',
    data: {
      section80D: { selfLimit, selfDeduction, parentLimit, parentDeduction, totalDeduction },
      taxSaved, effectivePremium: premium - taxSaved,
      tip: age >= 60 ? 'Senior citizens get enhanced ₹50,000 deduction under 80D' : 'You can claim up to ₹25,000 for self/family + ₹25,000 for parents'
    }
  });
});

export default router;
