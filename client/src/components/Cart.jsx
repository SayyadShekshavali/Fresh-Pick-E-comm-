import React, { useEffect, useState } from "react";
import { CartStore } from "../store/CartStore";
import { useAuthStore } from "../store/useAuthstore.js";
import { Payment } from "../store/payment.js";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

function Cart() {
  const { Itemdel } = CartStore();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuthStore();
  const { FetchCartItems } = CartStore();
  const [cartItems, setCartItems] = useState([]);
  const { PaymentS } = Payment();
  const [form, setForm] = useState({
    Houseno: "",
    Landmark: "",
    City: "",
    Pincode: "",
  });
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
  const checkValidations = async () => {
    if (
      !form.Houseno?.trim() ||
      !form.City?.trim() ||
      !form.Landmark?.trim() ||
      !/^\d{6}$/.test(form.Pincode)
    ) {
      alert("Invalid Address details");
    }

    if (!stripe || !elements) {
      alert("Stripe is not yet loaded. Please try again.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      alert("Please enter your card details");
      return;
    }
    console.log(
      `House No: ${form.Houseno}, City: ${form.City}, Landmark: ${form.Landmark}, Pincode: ${form.Pincode}`
    );
    try {
      const { clientSecret } = await PaymentS({
        amount: Math.round(cartTotal * 100),
      });
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });
      if (result.error) {
        console.error(result.error.message);
        alert("payment Failed:", result.error.message);
      } else {
        if (result.paymentIntent.status == "succeeded") {
          alert("Payment is Succesfull");
        }
      }
    } catch (error) {
      console.error("Error creating payment", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemove = async (userId, productId) => {
    await Itemdel(userId, productId);
    const items = await FetchCartItems({ UserId: userId });
    setCartItems(items || []);
  };
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
              className="relative flex gap-6 items-center border p-4 rounded mb-4 lg:w-[calc(100dvw-1rem)] w-full "
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
              <button
                className="absolute right-10 bottom-10 p-3 !bg-red-400 rounded-xl h-10 text-center"
                onClick={() => handleRemove(user._id, product._id)}
              >
                Remove
              </button>
            </div>
          );
        })
      )}
      <div className="text-right mt-6">
        <p className="lg:text-2xl text-xl font-bold">
          Grand Total: ${cartTotal.toFixed(2)}
        </p>
      </div>
      <div className="flex flex-col justify-center items-center  ">
        <p className="text-center text-2xl font-bold">Adress details </p>
        <form
          action="Submit"
          className="flex flex-col justify-start items-start gap-4 m-10"
        >
          <div className="flex flex-row items-center gap-2">
            <label className="lg:text-xl text-sm" htmlFor="houseno">
              House No:{" "}
            </label>
            <input
              id="houseno"
              value={form.Houseno}
              onChange={handleChange}
              name="Houseno"
              className="h-9 lg:w-90 w-45 border-1 border-black rounded-xl p-4 "
              type="text"
            />
          </div>

          <div className="flex flex-row items-center gap-2">
            <label className="lg:text-xl text-sm" htmlFor="landmark">
              Landmark:
            </label>
            <input
              id="landmark"
              value={form.Landmark}
              onChange={handleChange}
              name="Landmark"
              className="h-9 lg:w-90 w-45 border-1 border-black rounded-xl p-4"
              type="text"
            />
          </div>

          <div className="flex flex-row items-center gap-2">
            <label className="lg:text-xl text-sm" htmlFor="city">
              City/Place:
            </label>
            <input
              id="city"
              name="City"
              value={form.City}
              onChange={handleChange}
              className="h-9 lg:w-90 w-45 border-1 border-black rounded-xl !text-black p-4 "
              type="text"
            />
          </div>

          <div className="flex flex-row items-center gap-2">
            <label className="lg:text-xl text-sm" htmlFor="pinCode">
              Pin Code:
            </label>
            <input
              id="pinCode"
              value={form.Pincode}
              onChange={handleChange}
              name="Pincode"
              className="h-9 lg:w-90 w-45 border-1 border-black rounded-xl p-4 text-black"
              type="number"
            />
          </div>
        </form>
      </div>
      <div className="m-5 border p-4 rounded">
        <CardElement />
      </div>
      <div className="flex justify-center items-center ">
        <button
          onClick={() => {
            checkValidations();
          }}
          className="px-4 py-2 !bg-teal-600 text-black rounded-xl"
        >
          Buy it now
        </button>
      </div>
    </div>
  );
}

export default Cart;
