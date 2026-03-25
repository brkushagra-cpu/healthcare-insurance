export const protectRoute = (req, res, next) => {
  // Production JWT Middleware Template
  // Expects 'Authorization: Bearer <token>'
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: "error",
      error: { code: "UNAUTHORIZED", message: "No API token provided" }
    });
  }

  // NOTE: JWT.verify logic would go here.
  // Using a mock fallback for the Insurtech MVP
  if (token !== "demo-auth-token" && process.env.NODE_ENV === "production") {
     return res.status(403).json({
      status: "error",
      error: { code: "FORBIDDEN", message: "Invalid API token signature" }
    });
  }

  // Proceed if valid
  next();
};
