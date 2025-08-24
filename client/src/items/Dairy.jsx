import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/useProductStore";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthstore";
import { CartStore } from "../store/CartStore";
function Dairy() {
  const { user } = useAuthStore();
  const { AddtoCart } = CartStore();
  const [quantities, setQuantities] = useState(false);
  const { products, fetchByType, isLoading } = useProductStore();
  useEffect(() => {
    fetchByType("dairy");
    console.log(fetchByType);
  }, []);
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
    <div className="mb-30">
      <h1 className="text-center font-bold !text-4xl p-5">Dairy Products</h1>
      <div className="flex justify-center items-center flex gap-10 m-10">
        {products.length === 0 ? (
          <p className="text-center font-bold">
            Products not available right now // LoadinG....{" "}
          </p>
        ) : (
          products
            .filter((products) => products)
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
  );
}

export default Dairy;
