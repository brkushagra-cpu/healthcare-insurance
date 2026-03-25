import express from "express";
import { getAnalyticsDashboard } from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/", getAnalyticsDashboard);

export default router;
