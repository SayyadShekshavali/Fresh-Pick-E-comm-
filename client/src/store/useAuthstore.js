import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isauthenticated: false,
      isSigningUp: false,
      isLoggingIn: false,
      isUpdatingProfile: false,
      isCheckingAuth: true,
      onlineUsers: [],
      socket: null,

      checkAuth: async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/auth/check`
          );

          set({ user: res.data });
        } catch (error) {
          console.log("Error in checkAuth:", error);
          set({ user: null });
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      signup: async ({ email, password, fullname }) => {
        set({ isSigningUp: true });
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/signup`,
            {
              email,
              password,
              fullname,
            },
            { withCredentials: true }
          );
          set({ user: res.data.user, isauthenticated: true });
          toast.success("Account created successfully");
          return true;
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "Error during signup";

          toast.error(errorMessage);
          set({ error: errorMessage });

          return false;
        } finally {
          set({ isSigningUp: false });
        }
      },

      login: async ({ email, password }) => {
        set({ isLoggingIn: true });
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/login`,
            {
              email,
              password,
            },
            { withCredentials: true }
          );
          const token = res.data.token;
          if (token) {
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          }
          console.log(token);
          set({ user: res.data });
          toast.success("Logged in successfully");

          return true;
        } catch (error) {
          toast.error(error?.response?.data?.message || "Something went wrong");
          return false;
        } finally {
          set({ isLoggingIn: false });
        }
      },

      logout: async () => {
        try {
          await axios.post("/logout");
          set({ user: null });
          toast.success("Logged out successfully");
          get().disconnectSocket();
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },

      updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
          const res = await axios.put("/profile", data);
          set({ user: res.data });
          toast.success("Profile updated successfully");
        } catch (error) {
          console.log("error in update profile:", error);
          toast.error(error.response.data.message);
        } finally {
          set({ isUpdatingProfile: false });
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
