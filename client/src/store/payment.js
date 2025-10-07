import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
export const Payment = create(() => ({
  PaymentS: async ({ amount }) => {
    console.log(amount);
    try {
      const res = await axios.post(`${API_URL}/payment/create-payment`, {
        amount,
      });
      console.log(res.data);
      if (res.data?.clientSecret) {
        console.log(res.data.clientSecret);
        toast.success("Payment done");
        return res.data?.clientSecret;
      } else {
        throw new Error("No client secrete returned from backend");
      }
    } catch (error) {
      console.log("Error in server ", error);
      toast.error("Error at somewhere");
    }
  },
}));
