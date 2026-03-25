import "dotenv/config";
import express from "express";
import cors from "cors";
import compression from "compression";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

import { connectDB } from "./config/db.js";
import quoteRoutes from "./routes/quoteRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import planRoutes from "./routes/planRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import riskRoutes from "./routes/riskRoutes.js";
import compareRoutes from "./routes/compareRoutes.js";
import hospitalRoutes from "./routes/hospitalRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// 1. Establish MongoDB Connection
connectDB();

// 2. Production Security Hardening
app.use(compression());
app.use(morgan("dev"));

app.use(cors({
  origin: process.env.NODE_ENV === "production" 
    ? ["https://eptain-insurance-app.vercel.app"] 
    : "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: "error",
    error: { code: "RATE_LIMITED", message: "Too many requests from this IP" }
  }
});
app.use("/api/v1/", apiLimiter);

app.use(express.json());

// 3. Gateway Routes
app.use("/api/v1/quote", quoteRoutes);
app.use("/api/v1/lead", leadRoutes);
app.use("/api/v1/plans", planRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/risk", riskRoutes);
app.use("/api/v1/compare", compareRoutes);
app.use("/api/v1/hospitals", hospitalRoutes);
app.use("/api/v1/user", userRoutes);

// 4. Health check
app.get("/", (req, res) => {
  res.send("API running securely. Analytics Dashboard Mounted.");
});

// Central Error Handler
app.use((err, req, res, next) => {
  console.error("Unhanded Error:", err.stack);
  res.status(500).json({ status: "error", error: { code: "SERVER_ERROR", message: err.message } });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running securely on port ${PORT}`);
});
