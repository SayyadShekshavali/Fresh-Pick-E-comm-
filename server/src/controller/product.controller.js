import Product from "../models/Products.js";

export const upload = async (req, res) => {
  try {
    const { name, quantity, price, type, description } = req.body;
    const photo = req.file?.path.replace(/\\/g, "/") || "";

    const userId = req.userId;

    const newProduct = Product({
      name,
      quantity,
      price,
      type,
      photo,
      user: userId,
      description,
    });
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product uploaded successfully", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
