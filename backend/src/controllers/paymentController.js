export const createPaymentIntent = async (req, res) => {
  try {
    const { leadId, amount } = req.body;

    if (!leadId || !amount) {
      return res.status(400).json({
        status: "error",
        error: { code: "INVALID_INPUT", message: "Missing leadId or amount" }
      });
    }

    // MOCK STRIPE/RAZORPAY INTEGRATION logic
    // In production, we would use the stripe library to generate a client_secret
    const mockClientSecret = `pi_test_${leadId}_secret_${Date.now()}`;
    const mockOrderId = `order_${Date.now()}`;

    res.json({
      status: "success",
      data: {
        orderId: mockOrderId,
        clientSecret: mockClientSecret,
        amount,
        currency: "INR",
        gateway: "Mock_Stripe_Razorpay"
      },
      error: null
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      error: { code: "SERVER_ERROR", message: err.message }
    });
  }
};
