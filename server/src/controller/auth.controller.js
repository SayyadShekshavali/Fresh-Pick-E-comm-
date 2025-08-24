import { generateToken } from "../lib/gentoken.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { SendMail } from "../mailtrap/Email.config.js";

import {
  sendPasswordresetEmail,
  sendResetSuccessEmail,
  SenderVerificationCode,
} from "../mailtrap/Email.js";

export const signup = async (req, res) => {
  console.log("Received data:", req.body);
  const { fullname, email, password } = req.body;
  try {
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "Your should fill all details" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Your password should have atleast 6 letters" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "user already  having existing accounts" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(password, salt);
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    console.log("Hashed Password:", hashedpass);
    const newUser = new User({
      fullname,
      email,
      password: hashedpass,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
      verificationCode,
    });
    console.log(newUser);
    if (newUser) {
      await newUser.save();

      generateToken(newUser._id, res);
      SendMail(newUser.email, newUser.fullname);
      await SenderVerificationCode(newUser.email, newUser.verificationCode);

      res.status(201).json({
        success: true,
        message: "Message created successfully",
        user: { ...newUser._doc, password: undefined },
      });
    } else {
      return res.status(400).json({ message: "Invlaid user data" });
    }
  } catch (error) {
    console.log("Error in controller ", error);
    res.status(400).json({ message: "Internal server Error" });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  console.log("Received request body:", req.body);
  console.log("Received verification code:", req.body.code);

  try {
    const user = await User.findOne({
      verificationCode: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code ",
      });
    }
    user.isVerfied = true;
    user.verificationCode = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
    await SendMail(user.email, user);
    res.status(200).json({
      success: true,
      message: "Email is verified sucessful",
    });
  } catch (error) {
    console.log("error in email verification", error);
  }
};

export const login = async (req, res) => {
  console.log("req.bosy", req.body);
  const { email, password } = req.body;

  console.log("Login request received with:", email, password);
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const passcorrect = await bcrypt.compare(password, user.password);
    if (!passcorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user._id, res);

    user.lastLogin = new Date();
    await user.save();
    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      Profilepic: user.Profilepic,
      token,
    });
  } catch (error) {
    console.log("Error in login controller ", error);
    return res.status(500).json({ message: "INternal server error" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await user.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000;
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetPasswordExpiresAt;
    await user.save();
    await sendPasswordresetEmail(
      user.email,
      `${process.env.CLIENT_URL}/auth/reset-password/${resetToken}`
    );
    res.status(200).json({
      success: true,
      message: "password reset link sent to your email",
    });
  } catch (error) {}
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const user = await user.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    user.password = hashedpassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);
    res
      .status(200)
      .json({ success: true, message: "password reset sucessful" });
  } catch (error) {
    console.log("Error in passwors", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const profile = async (req, res) => {
  const { profilepic } = req.body;
  const userId = req.user._id;

  try {
    if (!profilepic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }
    const uploadresponse = await cloudinary.uploader.upload(profilepic);
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { Profilepic: uploadresponse.secure_url },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    console.log("Error in uploder controller ", error);
    return res.status(400).json({ message: "INternal server error" });
  }
};

export const check = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Token verified successfully",
      userId: req.userId,
    });
  } catch (error) {
    console.log("Error in checker controller ", error);
    return res.status(500).json({ message: "INternal server error" });
  }
};

export const addToCart = async (req, res) => {
  const { userId, productId, name, price, quantity, image } = req.body;

  try {
    const existing = await CartItem.findOne({ userId, productId });
    if (existing) {
      existing.quantity += quantity;
      await existing.save();
      res.status(200).json({ message: "Quantity updated", success: true });
    } else {
      const newItem = await CartItem({
        userId,
        productId,
        name,
        price,
        quantity,
        image,
      });
      await newItem.save();
      res.status(200).json({ message: "Added to cart", success: true });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const allItems = async (req, res) => {
  try {
    const items = await CartItem.find({ userId: req.param.userId });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteItem = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    await CartItem.findOneAndDelete({ userId, productId });
    res.status(200).json({ message: "Items is deleted", success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAll = async (req, res) => {
  try {
    await CartItem.deleteMany({ userId: req.params.userId });
    res.json({ message: "Cart cleared", success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
