import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  leadId: { type: String, unique: true, index: true },
  quoteId: String,
  name: String,
  phone: { type: String, index: true },
  email: String,
  selectedPlanId: String,
  status: { type: String, default: "NEW" }
}, { timestamps: true });

export default mongoose.models.Lead || mongoose.model("Lead", leadSchema);
