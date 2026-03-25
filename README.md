# Eptain Core - Institutional Insurance Platform

This repository implements a production-grade full-stack insurance quoting, pricing, and recommendation engine architecture.

## 🏗️ Architecture Overview

The system strictly adheres to the requested enterprise Insurtech architecture:
- **Frontend (React/Vite/Tailwind)**: Implements Step-based progressive quoting, Live Premium Tickers, Glassmorphism UI, and Dynamic comparison rendering.
- **Backend (Node.js/Express)**: Implements specialized microservices: `Quote Engine`, `Pricing Engine`, `Recommendation Engine`, and `Lead Services`.
- **Database**: Extensible JSON mock collections (plans, leads collection).
- **DevOps**: GitHub Actions Pipeline ready in `.github/workflows/deploy.yml`.

## 🚀 How to Run Locally

### 1. Launch the Backend API
1. Open a terminal and navigate to the backend config:
```bash
cd backend
npm install
npm start
```
*The API Gateway will start at http://localhost:5000.*

### 2. Launch the Frontend React App
1. Open a new terminal and navigate to the frontend:
```bash
cd frontend
npm install
npm run dev
```
*The App will start at http://localhost:5173.*

## 🧩 Architectural Highlights

- **Quote Engine (`services/quoteEngine.js`)**: Validates eligibility, drops out-of-age users, filters by plan types.
- **Pricing Engine (`services/pricingEngine.js`)**: Computes exact monthly premiums based on proprietary Risk Factors (Age multiples, Coverage limits, Member scales).
- **Recommendation Engine (`services/recommendationEngine.js`)**: Ranks array of generated plans logically. Places the 🏆 Best Value flag on the top output.

## 💡 Next Steps / Scale Up
- Migrate `data/plans.json` directly into Firebase Firestore or MongoDB.
- Attach Razorpay to `POST /api/lead`.
- Convert the mocked pricing constants to external Insurer APIs (e.g., HDFC Ergo API wrappers).
