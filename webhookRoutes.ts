import { Router, Request, Response } from "express";
import { handleStripeWebhook, verifyStripeWebhookSignature } from "../webhooks/stripe";

const router = Router();

// Stripe webhook endpoint
router.post("/stripe", async (req: Request, res: Response) => {
  const signature = req.headers["stripe-signature"] as string;
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !secret) {
    console.warn("[Webhook] Missing signature or secret");
    return res.status(400).json({ error: "Missing signature or secret" });
  }

  try {
    // Get raw body for signature verification
    let rawBody = "";
    req.on("data", (chunk) => {
      rawBody += chunk.toString();
    });

    req.on("end", async () => {
      const event = verifyStripeWebhookSignature(rawBody, signature, secret);

      if (!event) {
        return res.status(400).json({ error: "Invalid signature" });
      }

      try {
        await handleStripeWebhook(event);
        res.json({ received: true });
      } catch (error) {
        console.error("[Webhook] Error handling event:", error);
        res.status(500).json({ error: "Webhook processing failed" });
      }
    });
  } catch (error) {
    console.error("[Webhook] Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
