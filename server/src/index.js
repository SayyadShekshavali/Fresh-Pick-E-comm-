import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDb } from "./lib/db.js";
import authRouters from "./routers/auth.router.js";
import cartItems from "./routers/cart.router.js";
import productupload from "./routers/product.router.js";
import cors from "cors";
import bodyParser from "body-parser";
import { stripewebhook } from "./controller/webhookctrls.js";
import payment from "./routers/payment.router.js";
const allowedOrigins = [
  "http://localhost:5173",
  "https://fresh-pick-e-comm.vercel.app",
];
const app = express();
dotenv.config();
const PORT = process.env.BACKEND_URL || 7283;

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CoRs"));
      }
    },
    credentials: true,
  })
);
app.post(
  "/payment/webhook",
  bodyParser.raw({ type: "application/json" }),
  stripewebhook
);
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouters);
app.use("/cart", cartItems);
app.use("/uploads", express.static("uploads"));
app.use("/product", productupload);
app.use("/ReviewIV", express.static("ReviewIV"));
app.use("/payment", payment);
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`PORT is running on ${PORT} `);
  connectDb();
});
