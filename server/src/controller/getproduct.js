import Product from "../models/Products.js";
export const getAllProducts = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const fetchByType = async (req, res) => {
  const { type } = req.params;
  try {
    const products = await Product.find({ type: type });
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error at", error);
    res.status(404).json("Error at server");
  }
};
