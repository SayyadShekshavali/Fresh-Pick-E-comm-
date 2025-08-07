import mongoose, { Schema } from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    fullname: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
      minlength: 6,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerfied: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },

    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationCode: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
