import { createPaymentIntent } from "../controller/Paymentcontroller.js";

import express from "express";

const router = express.Router();

router.post("/create-payment", createPaymentIntent);

export default router;
