import { v4 as uuidv4 } from "uuid";
import Lead from "../models/leadModel.js";

export const createLead = async (req, res) => {
  try {
    const { quoteId, user, selectedPlanId } = req.body;

    if (!user || !selectedPlanId) {
      return res.status(400).json({
        status: "error",
        error: { code: "INVALID_INPUT", message: "Missing required fields" }
      });
    }

    const leadId = uuidv4();

    // 🔄 SAVE LEAD
    try {
      await Lead.create({
        leadId,
        quoteId,
        name: user.name,
        phone: user.phone,
        email: user.email,
        selectedPlanId
      });
    } catch (dbErr) {
      console.error("Lead save err:", dbErr.message);
    }

    res.json({
      status: "success",
      data: { leadId, message: "Lead captured successfully" },
      error: null
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      error: { code: "SERVER_ERROR", message: err.message }
    });
  }
};
