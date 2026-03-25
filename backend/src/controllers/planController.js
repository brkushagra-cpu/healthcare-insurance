import fs from "fs";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const plansPath = path.resolve(__dirname, '../data/plans.json');
const plans = JSON.parse(fs.readFileSync(plansPath, 'utf-8'));

export const getPlans = (req, res) => {
  res.json({
    status: "success",
    data: { plans },
    error: null
  });
};
