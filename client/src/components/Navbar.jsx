import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/Freshpick.png";
import { Menu, Search, ShoppingCart, User2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthstore";
import PUploadForm from "./PUploadForm";

function Navbar() {
  const [role, setRole] = useState("Customer");
  const [isOn, setIsOn] = useState(false);
  const [open, setOpen] = useState("");
  const menuref = useRef(null);
  const toggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    setRole(newState ? "Seller" : "Customer");
    console.log("Role set to:", newState ? "Seller" : "Customer");
  };
  const { user } = useAuthStore();
  const Navigate = useNavigate();
  useEffect(() => {
    const HideDropdown = (e) => {
      if (menuref.current && !menuref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", HideDropdown);
    return () => document.removeEventListener("mousedown", HideDropdown);
  }),
    [];
  return (
    <div
      ref={menuref}
      className="flex lg:flex-row md:flex-row md:h-17 md:pt-2  flex-col items-center justify-between border border-black lg:w-[calc(100dvw-1rem)]  w-full h-40  lg:h-20 mt-4 ml-0  rounded-xl bg-teal-800 text-white pb-5"
    >
      <div className="flex items-center">
        <Menu
          size={28}
          className="text-black lg:ml-3 mr-10 mt-3"
          onClick={() => setOpen(!open)}
        />
        {open && (
          <div className="absolute left-7 top-23 mt-2 w-30 bg-green-100 shadow-lg rounded-md z-50">
            <ul className="flex flex-col p-2">
              <li
                className=" text-black px-4 py-2 hover:bg-gray-100 cursor-pointer hover:bg-teal-500 rounded-xl transition-colors duration-[1000ms]  hover:pl-5"
                onClick={() => Navigate("/home")}
              >
                Home
              </li>
              <li
                className=" text-black px-4 py-2 hover:bg-gray-100 cursor-pointer hover:bg-teal-500 rounded-xl transition-colors duration-[1000ms] hover:pl-7"
                onClick={() => Navigate("/Cart")}
              >
                Cart
              </li>
              <li
                className=" text-black px-4 py-2 hover:bg-gray-100 cursor-pointer hover:bg-teal-500 rounded-xl transition-colors duration-[1000ms] hover:pl-10"
                onClick={() => Navigate("/Search")}
              >
                Search
              </li>
              <li
                className=" text-black px-4 py-2 hover:bg-gray-100 cursor-pointer hover:bg-teal-500 rounded-xl transition-colors duration-[1000ms] hover:pl-10"
                onClick={() => Navigate("/About")}
              >
                About
              </li>
            </ul>
          </div>
        )}
        <img
          className="h-8  lg:mt-4 lg:h-14 rounded-xl"
          src={logo}
          alt="Freshpick Logo"
        />
      </div>

      <div className="flex items-center h-12  w-12  lg:w-15 bg-white border border-black rounded-full px-4  lg:mt-5 lg:ml-120 ml-0 mt-0 text-xl">
        <Search
          className="text-black text-3xl lg:text-2xl"
          onClick={() => Navigate("/Search")}
        />
      </div>

      <div className="flex items-center space-x-4 lg:mt-5 lg:mr-2">
        <p className="hidden lg:block text-sm">
          💫 Order now, get within{" "}
          <strong className="text-yellow-400">1 day </strong>
        </p>
        <div className="">
          <button
            onClick={toggle}
            onDoubleClick={() => {
              if (isOn) {
                Navigate("/upload");
              }
            }}
            className={` w-30 px-6 py-2 rounded-full text-white font-semibold shadow-md transition duration-300 ${
              isOn
                ? "!bg-green-700 hover:!bg-green-800"
                : "!bg-red-800 hover:!bg-red-800"
            }`}
          >
            {isOn ? "Seller +" : "Customer"}
          </button>
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-white border border-black rounded-full">
          <ShoppingCart
            size={28}
            className="text-black"
            onClick={() => Navigate("/Cart")}
          />
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-white border border-black rounded-full">
          <User2
            size={28}
            className="text-black"
            onClick={() => Navigate(!user ? "/signup" : "/login")}
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
