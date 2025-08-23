import express from "express";
import { upload as Uploadcontroller } from "../controller/product.controller.js";
import { upload } from "../middleware/multer.js";
import Rupload from "../middleware/VImulter.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { getAllProducts } from "../controller/getproduct.js";
import { FetchProductDetails } from "../controller/productdetails.js";
import { WriteReview } from "../controller/productdetails.js";
import { fetchByType } from "../controller/getproduct.js";

const router = express.Router();

router.post("/upload", verifyToken, upload.single("photo"), Uploadcontroller);

router.get("/fetchall", getAllProducts);
router.get("/fetchbytype/:type", fetchByType);
router.get("/:id", FetchProductDetails);
router.post(
  "/:id/review",
  Rupload.fields([
    { name: "Image", maxCount: 1 },
    { name: "Video", maxCount: 1 },
  ]),
  WriteReview
);

export default router;
