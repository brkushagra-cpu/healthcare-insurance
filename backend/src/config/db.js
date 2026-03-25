import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // using local mongodb instance for demo purposes
    await mongoose.connect("mongodb://127.0.0.1:27017/eptainInsuranceDB");
    console.log("🟢 Production MongoDB Connected Successfully");
  } catch (err) {
    console.error("🔴 MongoDB Connection Error:", err.message);
    console.warn("Continuing in graceful degraded mode (API will function but persistence may fail).");
  }
};
