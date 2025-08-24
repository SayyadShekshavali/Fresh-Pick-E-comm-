import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import { useAuthStore } from "./store/useAuthstore";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import PUploadForm from "./components/PUploadForm";
import PDetails from "./components/PDetails";

import WriteReview from "./components/WriteReview";
import Cart from "./components/Cart";
import Search from "./components/Search";
import About from "./components/About";
import Footer from "./components/Footer";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Vegetables from "./items/Vegetables";
import Homesnacks from "./items/Homesnacks";
import Fruits from "./items/Fruits";
import Dairy from "./items/Dairy";
import Others from "./items/Others";
import Profile from "./components/Profile";
const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);
function App() {
  const { user, isSigningUp, isLoggingIn } = useAuthStore();
  return (
    <div className="  w-dvw border-0 border-black overflow-hidden">
      <Elements stripe={stripePromise}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={!user ? <Signup /> : <Home />} />
            <Route
              path="/signup"
              element={isSigningUp ? <Navigate to="/login" /> : <Signup />}
            />

            <Route path="/login" element={<Login />} />
            <Route path="/upload" element={<PUploadForm />} />
            <Route path="/product/:id" element={<PDetails />} />
            <Route path="/product/:id/write" element={<WriteReview />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/About" element={<About />} />
            <Route path="/vegetables" element={<Vegetables />} />
            <Route path="/homesnacks" element={<Homesnacks />} />
            <Route path="/fruits" element={<Fruits />} />
            <Route path="/dairy" element={<Dairy />} />
            <Route path="/more" element={<Others />} />

            <Route path="/profile" element={user ? <Profile /> : <Login />} />
          </Routes>
          <Footer />
          <Toaster />
        </BrowserRouter>
      </Elements>
    </div>
  );
}

export default App;
