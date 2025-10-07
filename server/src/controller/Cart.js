import express from "express";
import CartItems from "../models/cartitems.js";
import mongoose from "mongoose";

export const CartStore = async (req, res) => {
  try {
    const { userId, ProductId, quantity } = req.body;
    console.log("Request Body:", req.body);
    if (!userId || !ProductId || !quantity) {
      return res
        .status(400)
        .json({ message: "productId and userId are required." });
    }
    let cart = await CartItems.findOne({ userId });

    if (cart) {
      const itemIdx = cart.items.findIndex(
        (item) => item.Products?.toString() == ProductId
      );
      if (itemIdx > -1) {
        cart.items[itemIdx].quantity += quantity;
      } else {
        cart.items.push({ Products: ProductId, quantity });
      }
      await cart.save();
      return res.status(200).json({ message: "Cart updated", cart });
    } else {
      const newCartItems = new CartItems({
        userId,
        items: [{ Products: ProductId, quantity }],
      });
      await newCartItems.save();
      return res
        .status(201)
        .json({ message: "Cart created", cart: newCartItems });
    }
  } catch (error) {
    console.log("Error at server", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const FetchCartItems = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }
  try {
    const cartItems = await CartItems.find({ userId }).populate(
      "items.Products"
    );
    if (!cartItems) {
      return res.status(404).json({ message: "Cart not found for this user" });
    }

    res.status(200).json({
      message: "Product details fetchnig",
      items: cartItems.map((cart) => cart.items).flat(),
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error fetching cart" });
  }
};

export const DeleteItems = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    console.log("Incoming delete request body:", req.body);

    const user = await CartItems.findOne({ userId: userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid productId" });
    }

    const update = await CartItems.findOneAndUpdate(
      { userId: userId },
      {
        $pull: { items: { Products: new mongoose.Types.ObjectId(productId) } },
      },
      { new: true }
    );
    return res.status(200).json({
      message: "Item deleted successfully",
      cart: update,
    });
  } catch (error) {
    console.error("Error deleting item:", error.message, error.stack);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
