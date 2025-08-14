import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
const stripe = new Stripe(process.env.SECRET_KEY);
export const stripewebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.WEBHOOK_SECRET_KEY
    );
  } catch (error) {
    console.error("webhook verification failed:", error);
    return res.status(400).send(`webHook Error:${error.message}`);
  }
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      console.log("✅ Payment succeeded:", paymentIntent.id);
      break;

    case "payment_intent.payment_failed":
      console.log("❌ Payment failed");
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
};
