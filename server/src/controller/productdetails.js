import { Model } from "mongoose";
import Product from "../models/Products.js";
import Review from "../models/Review.js";

export const FetchProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const review = await Review.find({ Product: req.params.id });
    if (!product) return res.status(404).json({ message: "PRoduct not found" });
    return res.status(200).json({ message: "PRoduct ", product, review });
  } catch (error) {
    console.log("Error at ", error);
  }
};

export const WriteReview = async (req, res) => {
  try {
    const { comment, stars, id } = req.body;
    console.log(id);
    if (!id) {
      res.status(404).json({ message: "USerId or ProductId not entered" });
    }
    const files = req.files;
    const imageUrl = files?.Image?.[0]?.path || null;
    const videoUrl = files?.Video?.[0]?.path || null;
    console.log(imageUrl, videoUrl);
    const newReview = Review({
      Product: id,
      Comment: comment,
      imageUrl: imageUrl,
      videoUrl: videoUrl,
      Stars: stars || 5,
    });
    await newReview.save();
    res.status(200).json({ message: "Review Uploaded" });
  } catch (error) {
    console.log("Error in server", error);
    res.status(500).json({ message: "Error at somewhere" });
  }
};
