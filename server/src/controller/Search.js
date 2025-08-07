import Product from "../models/Products.js";

export const Search = async (req, res) => {
  const { name } = req.query;
  try {
    const products = await Product.find({
      name: { $regex: name, $options: "i" },
    });
    if (!products) {
      return res.status(404).json("No Product found with the given name ");
    }
    return res.status(200).json({ products });
  } catch (error) {
    console.log("Error at:", error);
    return res.status(402).json("Error at server");
  }
};
