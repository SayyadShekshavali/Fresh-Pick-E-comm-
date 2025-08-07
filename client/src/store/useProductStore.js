import { create } from "zustand";

import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;
export const useProductStore = create((set) => ({
  products: [],
  isLoading: false,

  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/product/fetchall`
      );
      set({ products: res.data });
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error("Failed to load products");
    } finally {
      set({ isLoading: false });
    }
  },
}));
