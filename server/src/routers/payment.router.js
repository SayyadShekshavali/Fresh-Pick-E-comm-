import { createPaymentIntent } from "../controller/Paymentcontroller.js";
import { stripewebhook } from "../controller/webhookctrls.js";
import express from "express";
import bodyParser from "body-parser";
const router = express.Router();

router.post("/create-payment", createPaymentIntent);
router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  stripewebhook
);

export default router;
