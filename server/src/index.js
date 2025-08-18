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
  "https://fresh-pick-e-comm-an2n.vercel.app",
];
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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

connectDb();
// app.listen(PORT, () => {
//   console.log(`PORT is running on ${PORT} `);
//
// });

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running locally on http://localhost:${PORT}`);
  });
}

// ✅ For Vercel
export default app;
