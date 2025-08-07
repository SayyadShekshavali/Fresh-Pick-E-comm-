import React, { useEffect, useState } from "react";
import { CartStore } from "../store/CartStore";
import { useAuthStore } from "../store/useAuthstore.js";
function Cart() {
  const { user } = useAuthStore();
  const { FetchCartItems } = CartStore();
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const items = await FetchCartItems({ UserId: user._id });
      setCartItems(items || []);
    };
    fetchData();
  }, [user, FetchCartItems]);
  const cartTotal = cartItems.reduce((total, item) => {
    const product = item.Products;
    if (!product) return total;
    return total + product.price * item.quantity;
  }, 0);
  return (
    <div>
      
      <h1
        style={{ textShadow: "2px 4px 5px rgba(0, 0, 0, 0.3)" }}
        className="text-center m-10 font-bold "
      >
        Cart-Items
      </h1>
      {cartItems.length == 0 ? (
        <p>Cart doesn't have any items.</p>
      ) : (
        cartItems.map((item, index) => {
          const product = item.Products;

          return (
            <div
              className="flex gap-6 items-center border p-4 rounded mb-4 lg:w-[calc(100dvw-1rem)] w-full "
              key={index}
            >
              <div className="w-full lg:w-1/2 border- ">
                <img
                  src={`http://localhost:5000/${product.photo.replace(
                    /\\/g,
                    "/"
                  )}`}
                  alt={product.name}
                  className="lg:h-50 lg:w-100 h-[70px] w-[140px] md:h-[90px] w-[150px] object-cover rounded"
                />
              </div>
              <div className="lg:w-60 w-1 lg:-ml-40  lg:mr-40 md:-ml-120 md:mr-40 ml-0 mr-10 ">
                <p className="lg:text-xl text-md font-bold">{product.name}</p>
                <p className="lg:text-lg text-md">Price: ${product.price}</p>
                <p className="lg:text-lg text-md">Quantity: {item.quantity}</p>
              </div>
              <p className="lg:text-lg text-sm font-semibold lg:mt-0 mt-30 border-black">
                total=${(product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          );
        })
      )}
      <div className="text-right mt-6">
        <p className="lg:text-2xl text-xl font-bold">
          Grand Total: ${cartTotal.toFixed(2)}
        </p>
      </div>
      <div className="flex justify-center items-center ">
        <button className="px-4 py-2 !bg-teal-600 text-black rounded-xl">
          Buy it now
        </button>
      </div>
    </div>
  );
}

export default Cart;
