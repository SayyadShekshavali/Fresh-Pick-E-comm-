import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthstore.js";
import { userProductupload } from "../store/userProductupload.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function PUploadForm() {
  const { user } = useAuthStore();
  const { upload, isUploading } = userProductupload();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    type: "",
    photo: null,
    description: "",
    location: { type: "Point", coordinates: [] },
  });
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setProduct({ ...product, photo: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(product);

    if (product.photo) {
      const imgURL = URL.createObjectURL(product.photo);
      console.log("Preview:", imgURL);
    }

    if (
      !product.name ||
      !product.price ||
      !product.quantity ||
      !product.type ||
      !product.photo ||
      !product.location
    ) {
      toast.error("Please fill all fields");
      return;
    }

    await upload({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      type: product.type,
      photo: product.photo,
      description: product.description,
      location: product.location,
    });
    console.log(upload);
    setProduct({
      name: "",
      price: "",
      quantity: "",
      type: "",
      photo: null,
      description: "",
      location: "",
    });
    if (setProduct) {
      navigate("/home");
    }
  };

  const handleGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setProduct({
            ...product,
            location: { type: "Point", coordinates: [lat, lng] },
          });
          toast.success("Location Captured");
        },
        (err) => {
          console.error(err);
          toast.error("Failed to get Location");
        }
      );
    } else {
      toast.error("Geolocation not supported in your browser");
    }
  };
  return (
    <div className="relative  border-0 border-black h-auto w-[calc(100dvw-1rem)] mb-20">
      <div className="flex items-center justify-center h-full w-full m-6">
        {user ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col rounded-xl border-1 border-black h-auto w-120 "
          >
            <h1 className="text-center font-bold mt-10 mb-15">
              Upload product
            </h1>

            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={product.name}
              onChange={handleChange}
              className="p-2 border rounded  mt-1 mx-10"
            />
            <textarea
              className="border-1 border-black mx-10 mt-4 flex align-center justify-center p-2 rounded-md"
              placeholder="Description"
              name="description"
              value={product.description}
              onChange={handleChange}
            ></textarea>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={product.price}
              onChange={handleChange}
              className="p-2 border rounded mt-3 mx-10"
            />
            <input
              type="text"
              name="quantity"
              placeholder="Quantity"
              value={product.quantity}
              onChange={handleChange}
              className="p-2 border rounded  mt-3 mx-10"
            />
            <select
              name="type"
              value={product.type}
              onChange={handleChange}
              className="p-2 border rounded mt-3 mx-10"
            >
              <option value="">Select Type</option>
              <option value="fruits">Fruits</option>
              <option value="vegetables">Vegetables</option>
              <option value="dairy">Dairy</option>
              <option value="snacks">Snacks</option>
              <option value="beverages">Beverages</option>
              <option value="other">Other</option>
            </select>

            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="p-2 border rounded  mt-3 mx-10"
            />
            {product.photo && (
              <img
                src={URL.createObjectURL(product.photo)}
                alt="Preview"
                className="w-40 h-40 object-cover mx-auto mt-4 border rounded"
              />
            )}
            <button
              className=" w-40 py-2 rounded-xl mt-3 mx-auto bg-red-700 "
              onClick={handleGeoLocation}
            >
              Use Current location
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className={`flex w-40 item-center justify-center py-2 rounded-xl mt-3 mx-auto !bg-teal-700 ${
                isUploading
                  ? "bg-green-400 "
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {isUploading ? "Uploading..." : "Upload Product"}
            </button>
          </form>
        ) : (
          <h1>User is not authenticated</h1>
        )}
      </div>
    </div>
  );
}

export default PUploadForm;
