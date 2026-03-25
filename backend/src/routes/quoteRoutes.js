import express from "express";
import { body, validationResult } from "express-validator";
import { generateQuote } from "../controllers/quoteController.js";

const router = express.Router();

const validateQuoteInput = [
  body("user").isObject().withMessage("User object is required"),
  body("user.age").isInt({ min: 18, max: 100 }).withMessage("Age must be between 18 and 100"),
  body("user.coverage").isNumeric(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        error: { code: "INVALID_INPUT", message: errors.array()[0].msg, details: errors.array() }
      });
    }
    next();
  }
];

router.post("/", validateQuoteInput, generateQuote);

export default router;
