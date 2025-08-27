import Product from "../models/Products.js";

export const upload = async (req, res) => {
  try {
    console.log("REQ.BODY.LOCATION:", req.body.location);

    const location = req.body.location ? JSON.parse(req.body.location) : null;

    const { name, quantity, price, type, description } = req.body;
    const photo = req.file?.path.replace(/\\/g, "/") || "";
    if (!photo) {
      return res.status(400).json({ message: "Photo is required" });
    }
    const userId = req.userId;

    const newProduct = new Product({
      name,
      quantity,
      price,
      type,
      photo,
      user: userId,
      description,
      location,
    });
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product uploaded successfully", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};
