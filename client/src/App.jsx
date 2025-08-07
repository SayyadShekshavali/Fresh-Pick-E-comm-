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
function App() {
  const { user, isSigningUp, isLoggingIn } = useAuthStore();
  return (
    <div className="  w-dvw border-0 border-black overflow-hidden">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={!user ? <Signup /> : <Home />} />
          <Route
            path="/signup"
            element={isSigningUp ? <Navigate to="/login" /> : <Signup />}
          />
          <Route path="/login" element={isLoggingIn ? <Home /> : <Login />} />
          <Route path="/upload" element={<PUploadForm />} />
          <Route path="/product/:id" element={<PDetails />} />
          <Route path="/product/:id/write" element={<WriteReview />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/About" element={<About />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
