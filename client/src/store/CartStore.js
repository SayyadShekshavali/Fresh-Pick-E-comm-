import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const CartStore = create(() => ({
  AddtoCart: async ({ User, Product, quantity }) => {
    const Data = {
      userId: User,
      ProductId: Product,
      quantity: quantity,
    };
    console.log("Add to cart data:", Data);
    try {
      const res = await axios.post(`${API_URL}/cart/add`, Data, {
        withCredentials: true,
      });
      toast.success("Item Added to Cart");
      return res;
    } catch (error) {
      toast.error("Error at somewhere");
      console.log("Error ", error);
    }
  },
  FetchCartItems: async ({ UserId }) => {
    console.log(UserId);
    try {
      const response = await axios.get(`${API_URL}/cart/fetchCartItems`, {
        params: { userId: UserId },
      });
      const items = response.data.items;
      toast.success("Fetched Products");
      return items;
    } catch (error) {
      toast.error("Error fetching cart items");
      console.error("FetchCartItems Error:", error);
    }
  },
  search: async (name) => {
    console.log(name);
    try {
      const res = await axios.get(`${API_URL}/cart/Search`, {
        params: { name },
      });
      const result = res.data.products;
      if (!result || result.length === 0) {
        toast.error("No product found with the given name.");
        return [];
      }

      console.log(result);
      toast.success("This is Your search Product");
      return res.data.products;
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    }
  },
  Itemdel: async (userId, productId) => {
    console.log("User_id", userId);
    console.log("Product_id:", productId);
    try {
      const res = await axios.post(`${API_URL}/cart/itemdelete`, {
        userId,
        productId,
      });
      console.log(res);
    } catch (error) {
      console.log("Error in server", error);
      toast.error("Error at api fetch");
    }
  },
}));
