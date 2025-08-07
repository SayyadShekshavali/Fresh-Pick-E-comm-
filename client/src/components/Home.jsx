import React from "react";
import img from "../assets/maini.png";
import veg from "../assets/veg.png";
import fruits from "../assets/fruits.png";
import spf from "../assets/specialfood.jpg";

import snacks from "../assets/snacks.jpg";
import { useEffect } from "react";
import { useState } from "react";
import { useProductStore } from "../store/useProductStore.js";
import { Link, useParams } from "react-router-dom";
import { CartStore } from "../store/CartStore.js";
import { useAuthStore } from "../store/useAuthstore.js";
function Home() {
  const { user } = useAuthStore();
  const { AddtoCart } = CartStore();
  const [quantities, setQuantities] = useState({});
  const { products, fetchProducts, isLoading } = useProductStore();

  useEffect(() => {
    fetchProducts();
    console.log(products);
  }, [fetchProducts]);
  const incre = (ProductId) => {
    setQuantities((prev) => ({
      ...prev,
      [ProductId]: (prev[ProductId] || 1) + 1,
    }));
  };
  const decre = (ProductId) => {
    setQuantities((prev) => ({
      ...prev,
      [ProductId]: Math.max(0, (prev[ProductId] || 1) - 1),
    }));
  };
  return (
    <div className="h-auto  w-full lg:w-[calc(100dvw-1rem)] border-0 border-black mx-1 mt-4 bg-gray-100 m-3">
      <div
        className="relative overflow-hidden  h-120  md:h-[400px] lg:h-[370px] 
          w-[calc(100dvw-1rem)]
          bg-teal-900 
          rounded-t-2xl 
          rounded-b-[10px] sm:rounded-b-[10px] md:rounded-b-[10px]  lg:rounded-b-[80px] xl:rounded-b-[80px]
        "
      >
        <div
          className=" relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[100px] 
          w-[calc(100dvw-1rem)] "
        >
          <div className="h-[90%] w-[40%] ml-10 mt-0 border-0 border-black">
            <h1 className="text-white lg:!text-3xl leading-relaxed  [word-spacing:1rem]  mt-10 font-bold font-sans italic text-center flex  items-center ">
              {" "}
              We came to you with fresHpick{" "}
            </h1>
            <p className="text-white !text-xl text-center mt-10 font-serif lg:ml-0 md:ml-0  ">
              We sell direct to farmer to customer
            </p>
            <button className="w-30 !bg-green-500 lg:ml-45 mt-10">
              Shop now
            </button>
          </div>
          <img
            src={img}
            className="absolute  lg:-top-15 md:top-10 top-50 lg:left-200 md:left-100 left-33  lg:h-100 lg:w-100  md:h-80 md:w-80 h-50 w-50 object-contain  "
            alt="hero"
          />
        </div>
      </div>
      <div className="mt-10  mx-0 h-35 w-[calc(100dvw-2rem)] border-0 border-black p-2 flex flex-wrap   justify-center items-center">
        <div className="lg:h-30 h-25 lg:w-40 w-30 border-0 border-black lg:mx-10  mb-8 rounded-xl shadow-[0px_0px_5px_3px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105 mx-3">
          <h1 className="lg:!text-xl  !text-sm mt-1 ml-2  font-bold">
            Vegetables
          </h1>
          <p className="lg:!text-[15px] ml:10 !text-[10px] mb-2">
            From formers
          </p>
          <img
            src={veg}
            className="lg:h-20 h-10  lg:w-30 w-20 -mt-2 ml-7"
            alt="veg"
          />
        </div>
        <div className="lg:h-30 h-25 lg:w-40 w-30 border-0 border-black lg:mx-10  mb-8 rounded-xl shadow-[0px_0px_5px_3px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105 ">
          <h1 className="lg:!text-xl  !text-sm mt-1 ml-2 font-bold">
            {" "}
            HomeSnacks
          </h1>
          <p className="lg:!text-[15px] ml:10 !text-[10px] mb-2">
            From formers
          </p>
          <img
            src={snacks}
            className="lg:h-20 h-10  lg:w-30 w-20 -mt-2 ml-7"
            alt="veg"
          />
        </div>
        <div className="lg:h-30 h-25 lg:w-40 w-30 border-0 border-black lg:mx-10  mb-8 rounded-xl shadow-[0px_0px_5px_3px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105 mx-3">
          <h1 className="lg:!text-xl  !text-sm mt-1 ml-2 font-bold">Fruits</h1>
          <p className="lg:!text-[15px] ml:10 !text-[10px] mb-2">
            From formers
          </p>
          <img
            src={fruits}
            className="lg:h-20 h-10  lg:w-30 w-20 -mt-2 ml-7"
            alt="veg"
          />
        </div>
        <div className="lg:h-30 h-25 lg:w-40 w-30 border-0 border-black lg:mx-10  mb-8 rounded-xl shadow-[0px_0px_5px_3px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105 ">
          <h1 className="lg:!text-xl  !text-sm mt-1 ml-2 font-bold">Dairy</h1>
          <p className="lg:!text-[15px] ml:10 !text-[10px] mb-2">
            From formers
          </p>
          <img
            src={veg}
            className="lg:h-20 h-10  lg:w-30 w-20 -mt-2 ml-7"
            alt="veg"
          />
        </div>
        <div className="lg:h-30 h-25 lg:w-40 w-30 border-0 border-black lg:mx-10  mb-8 rounded-xl shadow-[0px_0px_5px_3px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105 mx-3">
          <h1 className="lg:!text-xl  !text-sm mt-1 ml-2 font-bold">More</h1>
          <p className="lg:!text-[15px] ml:10 !text-[10px] mb-2">
            From formers
          </p>
          <img
            src={spf}
            className="lg:h-20 h-10  lg:w-30 w-20 -mt-2 ml-7"
            alt="veg"
          />
        </div>
      </div>

      <h1 className="lg:w-100  border-0 border-black  ml-20 lg:mt-0 md:ml-0 sm:ml-70 font-bold lg:!text-4xl !text-xl lg:mt-0 md:mt-0 mt-70">
        Best sellers
      </h1>
      <div className="  border-0 border-black lg:mt-0 md:mt-0 flex mt-0">
        <div
          className=" lg:mt-2 lg:w-[calc(100dvw-2rem)] w-[calc(100dvw-2rem)] lg:ml-0 md:ml-0 -ml-8 h-auto border-0 border-black grid lg:grid-cols-6 
        md:grid-cols-4  grid-cols-2 p-10 lg:gap-10 gap-25 mb-30 "
        >
          {isLoading ? (
            <p>Loading products...</p>
          ) : (
            products
              .filter((product) => product)
              .map((product) => (
                <div
                  className="h-60 w-35 text-black border-0 border-black rounded-xl shadow-2xl transition-all duration-100 lg:mb-10 hover:scale-105 hover:mb-10"
                  key={product._id}
                >
                  <Link className="!text-black" to={`/product/${product._id} `}>
                    <img
                      src={`http://localhost:5000/${product.photo.replace(
                        /\\/g,
                        "/"
                      )}`}
                      alt={product.name}
                      className="h-30 w-full rounded-t-xl"
                    />
                    <h3 className="text-center">
                      {product.name}({product.quantity})
                    </h3>

                    <p className="text-center">Price: {product.price}</p>
                  </Link>
                  <div className="flex gap-2 align-center justify-center m-2 ">
                    <button
                      className="  px-3 border border-black rounded-2xl text-2xl font-bold pb-1"
                      onClick={() => {
                        decre(product._id);
                      }}
                    >
                      -
                    </button>
                    <p className=" text-center h-8 w-6 text-xl border-black">
                      {quantities[product._id] || 1}
                    </p>
                    <button
                      className=" px-2 border border-black rounded-2xl text-2xl font-bold pb-1"
                      onClick={() => {
                        incre(product._id);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div className="flex justify-center bg-teal-700 rounded-xl my-3 h-10">
                    <button
                      className="border border-black rounded-xl px-2 py-1 "
                      onClick={(e) => {
                        e.preventDefault();
                        AddtoCart({
                          User: user?._id,
                          Product: product._id,
                          quantity: quantities[product._id] || 1,
                        });
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
      <footer>Footer </footer>
    </div>
  );
}

export default Home;
