import { v4 as uuidv4 } from "uuid";
import { getEligiblePlans } from "../services/quoteService.js";
import { calculatePremium } from "../services/pricingService.js";
import { rankPlans } from "../services/recommendationService.js";
import Quote from "../models/quoteModel.js";

export const generateQuote = async (req, res) => {
  try {
    const { user } = req.body;

    if (!user || user.age < 18) {
      return res.status(400).json({
        status: "error",
        error: { code: "INVALID_INPUT", message: "Invalid user data or age < 18" }
      });
    }

    let plans = getEligiblePlans(user);

    plans = plans.map((plan) => ({
      ...plan,
      premium: calculatePremium(user, plan),
      score: parseFloat((plan.claimRatio / 10).toFixed(1))
    }));

    const ranked = rankPlans(plans);

    const quoteId = uuidv4();

    // 🔄 MongoDB SAVE QUOTE (tracks user decision journey)
    try {
      await Quote.create({ quoteId, user, recommendedPlans: ranked.slice(0, 3) });
    } catch (dbErr) {
      console.error("Quote metrics save failed. Continuing response:", dbErr.message);
    }

    res.json({
      status: "success",
      data: { quoteId, plans: ranked.slice(0, 3) },
      meta: { generatedAt: new Date() },
      error: null
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      error: { code: "SERVER_ERROR", message: err.message }
    });
  }
};
