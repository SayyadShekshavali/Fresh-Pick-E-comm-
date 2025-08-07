import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  Products: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    reqiured: true,
  },
});
const cartSchema = mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  items: [cartItemSchema],
});
const CartItems = mongoose.model("CartItems", cartSchema);
export default CartItems;
