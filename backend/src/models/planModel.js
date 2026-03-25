import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  planId: { type: String, unique: true, index: true },
  name: String,
  insurer: String,
  maxAge: Number,
  maxCoverage: Number,
  basePrice: Number,
  claimRatio: Number,
  features: [String]
}, { timestamps: true });

export default mongoose.models.Plan || mongoose.model("Plan", planSchema);
