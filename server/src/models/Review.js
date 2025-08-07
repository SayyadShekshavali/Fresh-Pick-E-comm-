import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema({
  Product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  Comment: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  Stars: {
    min: 1,
    max: 5,
    type: Number,
    default: 5,
  },
});

const Review = mongoose.model("Review", ReviewSchema);
export default Review;
