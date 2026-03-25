import fs from "fs";
import { fileURLToPath } from 'url';
import path from 'path';

// Dynamically load plans.json directly without assertions for wider strict Node compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const plansPath = path.resolve(__dirname, '../data/plans.json');
const plans = JSON.parse(fs.readFileSync(plansPath, 'utf-8'));

export function getEligiblePlans(user) {
  return plans.filter(
    (plan) =>
      user.age <= plan.maxAge &&
      user.coverage <= plan.maxCoverage
  );
}
