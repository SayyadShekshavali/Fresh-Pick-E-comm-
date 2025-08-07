import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DBURL);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
};
