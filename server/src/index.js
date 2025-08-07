import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDb } from "./lib/db.js";
import authRouters from "./routers/auth.router.js";
import cartItems from "./routers/cart.router.js";
import productupload from "./routers/product.router.js";
import cors from "cors";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 7283;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouters);
app.use("/cart", cartItems);
app.use("/uploads", express.static("uploads"));
app.use("/product", productupload);
app.use("/ReviewIV", express.static("ReviewIV"));

app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`PORT is running on ${PORT} `);
  connectDb();
});
