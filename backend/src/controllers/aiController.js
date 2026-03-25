import { getAIResponse } from "../services/aiService.js";
import Plan from "../models/planModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ status: "error", error: { code: "INVALID_INPUT", message: "User message required" } });
    }

    // Contextual Data Enrichment (RAG)
    let contextData = [];
    try {
      contextData = await Plan.find().limit(5).lean();
    } catch (dbErr) {
      // Fallback to local JSON if MongoDB isn't running
      try {
        const plansPath = path.resolve(__dirname, '../data/plans.json');
        contextData = JSON.parse(fs.readFileSync(plansPath, 'utf-8'));
      } catch (fileErr) {
        contextData = [
          { name: "Health Secure Plus", premium: 12500, claimRatio: 92, type: "Health" },
          { name: "Care Supreme", premium: 18000, claimRatio: 89, type: "Health" },
          { name: "Motor Shield Pro", premium: 7500, claimRatio: 95, type: "Motor" },
        ];
      }
    }

    const aiReply = await getAIResponse(message, contextData);

    res.json({
      status: "success",
      data: { reply: aiReply },
      error: null
    });

  } catch (err) {
    console.error("AI Controller Error:", err.message);
    res.json({
      status: "success",
      data: { reply: "I'm currently operating in safe mode. Please try again shortly." },
      error: null
    });
  }
};
