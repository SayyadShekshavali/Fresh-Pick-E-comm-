import React from "react";
import farmer from "../assets/farmer.jpg";
import consumer from "../assets/consumer.png";
import logo from "../assets/FreshPick.png";
function About() {
  return (
    <div className="pb-5">
      <div className=" flex flex-col justify-center items-center mb-20">
        <img src={logo} className="h-50 w-50" />
        <p className="text-xl">
          We deliver fruits and vegetables directly from local farmers — no
          middlemen, no chemicals, just pure, healthy goodness.
        </p>
        <p className="text-xl">
          {" "}
          Experience the taste of nature, just the way it should be.
        </p>
      </div>
      <p className="text-center text-3xl m-5">What we Actually Do ? </p>
      <div className="bg-teal-100 p-5 rounded-2xl lg:w-[calc(100dvw-10rem)] w-full lg:flex lg:flex-row md:flex md:flex-row flex flex-col">
        <img src={farmer} className="h-50 rounded ml-15" />
        <p className="italic text-xl text-center lg:ml-50 ml-0 mt-10 drop-shadow-2xl">
          We buy fresh items from farmers every single day, ensuring you receive
          quality products that are sustainably sourced and delivered at peak
          freshness — handpicked, carefully packed, and delivered with care.
        </p>
      </div>
      <div className="  lg:flex lg:flex-row md:flex md:flex-row  flex flex-col bg-orange-200 p-5 rounded-2xl lg:w-[calc(100dvw-10rem)] w-full lg:ml-30 ml-0 mt-10 ">
        <p className="italic text-xl text-center  mt-10 drop-shadow-2xl">
          And we deliver to consumers within a day to ensure maximum freshness.
          If you'd like your order by tomorrow, simply place it before midnight
          today. We work directly with local farmers — no middlemen, no delays —
          just honest, farm-fresh products you can trust
        </p>
        <img src={consumer} className="h-50 rounded ml-15 m-5" />
      </div>
      <div className="text-xl text-center my-4 flex justify-center items-center">
        <u>Founder:</u> <p className="font-bold pl-3">Sayyad</p>
      </div>
      <p className="text-center !text-semibold ">
        We have team of 20 members to ensure fast and efficient delivery from
        farm to your doorstep
      </p>
    </div>
  );
}

export default About;
