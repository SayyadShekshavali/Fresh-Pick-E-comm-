import express from "express";
import { CartStore, FetchCartItems } from "../controller/Cart.js";
import { Search } from "../controller/Search.js";
const router = express.Router();

router.post("/add", CartStore);
router.get("/fetchCartItems", FetchCartItems);
// router.delete("/remove/:userId/:productId", deleteItem);
// router.delete("/clear/:userId", deleteAll);
router.get("/Search", Search);
export default router;
