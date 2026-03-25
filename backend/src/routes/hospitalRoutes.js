import express from 'express';
const router = express.Router();

// Major hospital network database
const HOSPITALS = [
  // Delhi NCR
  { id: 'h1', name: 'AIIMS New Delhi', city: 'New Delhi', state: 'Delhi', type: 'Government', specialties: ['Cardiology', 'Neurology', 'Oncology', 'Orthopedics'], beds: 2500, cashless: true, rating: 4.8 },
  { id: 'h2', name: 'Max Super Speciality', city: 'Saket, New Delhi', state: 'Delhi', type: 'Private', specialties: ['Cardiac Sciences', 'Neuro', 'Cancer', 'Joint Replacement'], beds: 500, cashless: true, rating: 4.6 },
  { id: 'h3', name: 'Fortis Escorts Heart', city: 'Okhla, New Delhi', state: 'Delhi', type: 'Private', specialties: ['Cardiology', 'Cardiac Surgery', 'Vascular Surgery'], beds: 310, cashless: true, rating: 4.7 },
  { id: 'h4', name: 'Apollo Hospitals', city: 'Jasola, New Delhi', state: 'Delhi', type: 'Private', specialties: ['Multi-specialty', 'Robotics Surgery', 'Transplant', 'Cancer'], beds: 710, cashless: true, rating: 4.5 },
  // Mumbai
  { id: 'h5', name: 'Kokilaben Dhirubhai', city: 'Andheri, Mumbai', state: 'Maharashtra', type: 'Private', specialties: ['Oncology', 'Neuro', 'Cardiac', 'Bone Marrow Transplant'], beds: 750, cashless: true, rating: 4.7 },
  { id: 'h6', name: 'Lilavati Hospital', city: 'Bandra, Mumbai', state: 'Maharashtra', type: 'Private', specialties: ['Multi-specialty', 'Nephrology', 'Gastroenterology'], beds: 314, cashless: true, rating: 4.4 },
  // Bangalore
  { id: 'h7', name: 'Narayana Health', city: 'Bangalore', state: 'Karnataka', type: 'Private', specialties: ['Cardiac Sciences', 'Cancer', 'Neuro', 'Multi-organ Transplant'], beds: 600, cashless: true, rating: 4.6 },
  { id: 'h8', name: 'Manipal Hospital', city: 'Old Airport Road, Bangalore', state: 'Karnataka', type: 'Private', specialties: ['Multi-specialty', 'Transplant', 'Robotic Surgery'], beds: 600, cashless: true, rating: 4.5 },
  // Chennai
  { id: 'h9', name: 'Apollo Chennai', city: 'Greams Road, Chennai', state: 'Tamil Nadu', type: 'Private', specialties: ['Cardiac', 'Joint Replacement', 'Oncology', 'Neuro'], beds: 560, cashless: true, rating: 4.5 },
  // Hyderabad
  { id: 'h10', name: 'KIMS Hospitals', city: 'Secunderabad', state: 'Telangana', type: 'Private', specialties: ['Multi-specialty', 'Cancer', 'Liver Transplant'], beds: 1000, cashless: true, rating: 4.4 },
  // Kolkata
  { id: 'h11', name: 'AMRI Hospital', city: 'Dhakuria, Kolkata', state: 'West Bengal', type: 'Private', specialties: ['Cardiac', 'Neuro', 'Orthopedics', 'Urology'], beds: 200, cashless: true, rating: 4.3 },
  // Pune
  { id: 'h12', name: 'Ruby Hall Clinic', city: 'Pune', state: 'Maharashtra', type: 'Private', specialties: ['Multi-specialty', 'IVF', 'Oncology', 'Joint Replacement'], beds: 550, cashless: true, rating: 4.4 },
];

// GET /api/v1/hospitals — All hospitals
router.get('/', (req, res) => {
  const { city, state, specialty, cashless } = req.query;
  let hospitals = [...HOSPITALS];
  if (city) hospitals = hospitals.filter(h => h.city.toLowerCase().includes(city.toLowerCase()));
  if (state) hospitals = hospitals.filter(h => h.state === state);
  if (specialty) hospitals = hospitals.filter(h => h.specialties.some(s => s.toLowerCase().includes(specialty.toLowerCase())));
  if (cashless === 'true') hospitals = hospitals.filter(h => h.cashless);
  
  res.json({
    status: 'success',
    data: {
      hospitals,
      total: hospitals.length,
      networkStats: { totalHospitals: 10000, cities: 150, states: 28, cashlessPartners: 8500 }
    }
  });
});

// POST /api/v1/hospitals/claims — File a claim
router.post('/claims', (req, res) => {
  const { policyNumber, hospitalId, claimType, description } = req.body;
  const claimId = 'CLM-' + Date.now().toString(36).toUpperCase();
  
  res.json({
    status: 'success',
    data: {
      claimId,
      status: 'Submitted',
      estimatedResolution: '24 hours',
      assignedAgent: 'Eptain Claims AI',
      nextSteps: ['Document verification in progress', 'Hospital network pre-authorization sent', 'Claim agent assigned within 2 hours'],
      trackingUrl: `/claims/${claimId}`
    }
  });
});

export default router;
