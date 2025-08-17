import express from "express";
import { CartStore, FetchCartItems } from "../controller/Cart.js";
import { Search } from "../controller/Search.js";
import { DeleteItems } from "../controller/Cart.js";
const router = express.Router();

router.post("/add", CartStore);
router.get("/fetchCartItems", FetchCartItems);
// router.delete("/remove/:userId/:productId", deleteItem);
// router.delete("/clear/:userId", deleteAll);
router.get("/Search", Search);
router.post("/itemdelete", DeleteItems);
export default router;
