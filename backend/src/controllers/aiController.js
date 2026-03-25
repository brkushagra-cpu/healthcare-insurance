import { getAIResponse } from "../services/aiService.js";
import Plan from "../models/planModel.js";

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ status: "error", error: { code: "INVALID_INPUT", message: "User message required" } });
    }

    // Contextual Data Enrichment (RAG Mock)
    let contextData = [];
    try {
      contextData = await Plan.find().limit(5); // Bring in the top 5 plans
    } catch (dbErr) {
       // Fallback mock JSON load if MongoDB isn't running directly
       import("fs").then(fs => {
           import("path").then(path => {
               import("url").then(url => {
                 const __filename = url.fileURLToPath(import.meta.url);
                 const __dirname = path.dirname(__filename);
                 const plansPath = path.resolve(__dirname, '../data/plans.json');
                 contextData = JSON.parse(fs.readFileSync(plansPath, 'utf-8'));
               });
           });
       });
    }

    const aiReply = await getAIResponse(message, contextData);

    res.json({
      status: "success",
      data: { reply: aiReply },
      error: null
    });

  } catch (err) {
    console.error("AI Gen Err:", err);
    res.status(500).json({
      status: "error",
      error: { code: "SERVER_ERROR", message: err.message }
    });
  }
};
