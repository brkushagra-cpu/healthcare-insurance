import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  quoteId: { type: String, unique: true, index: true },
  user: {
    age: Number,
    city: String,
    members: Number,
    coverage: Number
  },
  recommendedPlans: [{
    planId: String,
    premium: Number,
    score: Number
  }]
}, { timestamps: true });

export default mongoose.models.Quote || mongoose.model("Quote", quoteSchema);
