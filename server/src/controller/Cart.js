import express from "express";
import CartItems from "../models/cartitems.js";

export const CartStore = async (req, res) => {
  try {
    const { UserId, ProductId, quantity } = req.body;
    if (!UserId || !ProductId || !quantity) {
      return res
        .status(400)
        .json({ message: "productId and userId are required." });
    }
    let cart = await CartItems.findOne({ UserId });

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
        UserId,
        items: [{ Products: ProductId, quantity }],
      });
      await newCartItems.save();
      return res
        .status(201)
        .json({ message: "Cart created", cart: newCartItems });
    }
  } catch (error) {
    console.log("Error ar server", error);
    res.status(404).json({ message: "Error at somewhere in server" });
  }
};

export const FetchCartItems = async (req, res) => {
  const { UserId } = req.query;
  if (!UserId) {
    return res.status(400).json({ message: "UserId is required" });
  }
  try {
    const cartItems = await CartItems.find({ UserId }).populate(
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
    const user = await CartItems.findOne({ userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }
    const update = await CartItems.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId } } },
      { new: true }
    );
    return res.status(200).json({
      message: "Item deleted successfully",
      cart: update,
    });
  } catch (error) {
    console.error("Error deleting item:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
