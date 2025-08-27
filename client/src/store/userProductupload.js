import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
axios.defaults.withCredentials = true;
axios.defaults.withCredentials = true;

export const userProductupload = create((set) => ({
  isUploading: false,
  upload: async ({
    name,
    quantity,
    price,
    type,
    photo,
    description,
    location,
    userId,
  }) => {
    set({ isUploading: true });
    const formData = new FormData();
    formData.append("name", name);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("type", type);
    formData.append("photo", photo);
    formData.append("description", description);
    formData.append("location", JSON.stringify(location || {}));
    formData.append("userId", userId);
    console.log("Whilw data:", JSON.stringify(location || {}));
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    try {
      const token = localStorage.getItem("token");
      console.log("Stored token:", token);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/product/upload`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Product uploaded");
      console.log("Upload success:", res.data);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Upload failed. Please try again.";
      toast.error(errorMessage);
      return false;
    } finally {
      set({ isUploading: false });
    }
  },
  FetchProductDetails: async (id) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/product/${id}`
      );
      set({ productDetails: res.data.product, Review: res.data.review });
      toast.success("Product Details");
      return {
        product: res.data.product,
        review: res.data.review,
      };
    } catch (error) {
      console.log("Error fetching product details:", error);
      toast.error("Failed to fetch product");
      return null;
    }
  },
}));

export const WriteReviewStore = create(() => ({
  review: async ({ id, stars, comment, Image, Video }) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("stars", stars);
    formData.append("comment", comment);
    if (Image) formData.append("Image", Image);
    if (Video) formData.append("Video", Video);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/product/${id}/review`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Writter Review");
      return res.data;
    } catch (error) {
      console.log("Error fetching product details:", error);
      toast.error("Failed to fetch product");
    }
  },
}));
