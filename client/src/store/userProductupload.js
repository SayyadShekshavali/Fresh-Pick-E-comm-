import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
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
  }) => {
    set({ isUploading: true });
    const formData = new FormData();
    formData.append("name", name);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("type", type);
    formData.append("photo", photo);
    formData.append("description", description);
    formData.append("location", location);
    console.log(formData);
    try {
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
      console.log("error in uploading product:", error);
      toast.error(error?.response?.data?.message || "Upload failed");
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
