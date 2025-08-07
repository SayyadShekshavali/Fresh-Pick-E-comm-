import React from "react";
import logo from "../assets/Freshpick.png";
import { Mail, Instagram, Twitter, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
function Footer() {
  const Navigate = useNavigate();
  return (
    <div className="bg-emerald-100 lg:h-75 md:h-70 h-130 w-100dvw -my-15  border-0 border-black rounded-xl">
      <div className="flex flex-row flex-wrap bg-emerald-100 lg:m-15 ">
        <div className="flex-col justify-center items-center lg:m-6 m-4">
          <img
            src={logo}
            className="lg:h-15 lg:w-15 w-10 h-10 ml-10 rounded-full"
          />
          <div className="flex ">
            <Mail className="lg:h-6 lg:w-6 h-4 w-4 " />{" "}
            <p className="ml-3 lg:text-[1rem] text-[13px] "> @FreshPick.in</p>
          </div>
        </div>
        <div className="lg:m-10 m-2">
          <h2 className="font-bold lg:text-xl text-md ml-3">Pages</h2>
          <ul className="">
            <li
              className="m-3 lg:text-md text-sm hover:text-red-900 transition duration-150"
              onClick={() => Navigate("/home")}
            >
              Home
            </li>
            <li
              className="m-3 lg:text-md text-sm hover:text-red-900 transition duration-150"
              onClick={() => Navigate("/Cart")}
            >
              {" "}
              Cart
            </li>

            <li
              className="m-3 lg:text-md text-sm hover:text-red-900 transition duration-150"
              onClick={() => Navigate("/Navbar")}
            >
              Navbar
            </li>
            <li
              className="m-3 lg:text-md text-sm hover:text-red-900 transition duration-150"
              onClick={() => Navigate("/Search")}
            >
              Search
            </li>
            <li
              className="m-3 lg:text-md text-sm hover:text-red-900 transition duration-150"
              onClick={() => Navigate("signup")}
            >
              Signin
            </li>
          </ul>
        </div>
        <div className="lg:m-10 m-2">
          <h2 className="font-bold lg:text-xl text-md ml-3">Details</h2>
          <ul>
            <li
              className="m-3 lg:text-md text-sm hover:text-red-900 transition duration-150  "
              onClick={() => Navigate("/About")}
            >
              {" "}
              About
            </li>
            <li
              className="m-3 lg:text-md text-sm hover:text-red-900 transition duration-150"
              onClick={() => Navigate("/About")}
            >
              {" "}
              Terms & Conditions
            </li>
            <li
              className="m-3 lg:text-md text-sm hover:text-red-900 transition duration-150"
              onClick={() => Navigate("/About")}
            >
              {" "}
              FAQ
            </li>
          </ul>
        </div>
        <div className="lg:m-10 m-2 flex-col justify-end lg:ml-70 md:ml-30">
          <h2 className="font-bold lg:text-xl text-md ml-3">Follow us on</h2>
          <div className="flex gap-10 mt-5  ">
            <a
              href="https://www.instagram.com/__s_h_a_ik_s__ha_.__/"
              className="hover:text-pink-400 transition-colors"
            >
              <Instagram size={24} className="!text-red-600" />
            </a>
            <a
              href="https://x.com/SyedShaiks49477"
              className="hover:text-pink-400 transition-colors"
            >
              <Twitter size={24} className="!text-black" />
            </a>
            <a
              href="https://sayyadshekshavali.github.io/PortfoLio/"
              className="hover:text-pink-400 transition-colors"
            >
              <Globe size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
