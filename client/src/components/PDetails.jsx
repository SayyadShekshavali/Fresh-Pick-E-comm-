import React, { useEffect, useState } from "react";
import { userProductupload } from "../store/userProductupload";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function PDetails() {
  const { id } = useParams();
  const Navg = useNavigate();
  const FetchProduct = userProductupload((state) => state.FetchProductDetails);
  const [product, setProduct] = useState(null);
  const [review, setReview] = useState(null);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const getData = async () => {
      const data = await FetchProduct(id);
      console.log(data);
      setProduct(data.product);
      setReview(data.review);
    };
    getData();
  }, [id]);
  const incre = () => {
    setQuantity(quantity + 1);
  };
  const decre = () => {
    setQuantity(quantity - 1);
  };

  if (!product) return <p>Loading...</p>;
  return (
    <div>
      <div className="h-auto w-full border border-black  flex mt-10">
        <div className="w-1/2  border-0 border-black m-6 ">
          <img
            src={`http://localhost:5000/${product.photo.replace(/\\/g, "/")}`}
            alt={product.name}
            className="lg:h-100 md:80 h-50 w-full rounded-xl"
          />
        </div>
        <div className="w-1/2 flex flex-col align-center lg:pl-20 border-0 border-black">
          <p className=" font-sans font-bold my-5 lg:text-4xl ">
            {product.name}
          </p>
          <p className="text-2xl font-semi-bold ">${product.price}</p>
          <div className="flex lg:w-40 md:w-30 w-20 gap-2 items-center justify-center border-0 lg:mt-10 mt-5 border-black lg:ml-0 ml-3">
            <button
              className="px-3 border-0 border-black rounded-2xl lg:text-2xl text-md font-bold pb-1"
              onClick={() => {
                decre(product.quantity);
              }}
            >
              -
            </button>

            <p
              className="flex items-center justify-center text-center h-8 w-20 
  text-sm md:text-base lg:text-xl 
  border-black m-1 md:m-2 lg:m-3"
            >
              Quantity {quantity || 1}
            </p>

            <button
              className="px-3 border-0 border-black rounded-2xl lg:text-2xl text-md font-bold pb-1"
              onClick={() => {
                incre(product.quantity);
              }}
            >
              +
            </button>
          </div>
          <button className=" sm:w-20 md:w-48 lg:w-50 rounded-xl py-2 px-4 text-base md:text-lg lg:text-xl mt-6 !bg-teal-500 text-white hover:bg-teal-600 transition-all ">
            Add to Cart
          </button>

          <p className="mt-6 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
            <strong>Description:</strong> {product.description}
          </p>
        </div>
      </div>
      <div className="flex flex items-center justify-center mt-10">
        <button
          className="lg:text-2xl m-3 border-black p-2 rounded-xl"
          onClick={() => Navg(`/product/${id}/write`)}
        >
          Write Review
        </button>
      </div>
      {review.length === 0 ? (
        <p className="text-center text-gray-500">No reviews yet.</p>
      ) : (
        review.map((rev, index) => (
          <div
            key={rev._id || index}
            className="border p-4 rounded-lg shadow mb-6 h-60 overflow-scroll"
          >
            <p className="text-sm text-gray-500 mb-1">
              By {rev.userId?.username || "Anonymous"}
            </p>

            <p className="text-lg font-medium mb-3">{rev.Comment}</p>
            {rev.imageUrl && (
              <img
                src={`http://localhost:5000/${rev.imageUrl.replace(
                  /\\/g,
                  "/"
                )}`}
                alt="Review"
                className="h-40 w-auto rounded mb-3"
              />
            )}
            {rev.videoUrl && (
              <video
                controls
                className="w-full max-w-md rounded mb-3"
                src={`http://localhost:5000/${rev.videoUrl.replace(
                  /\\/g,
                  "/"
                )}`}
              >
                Your browser does not support the video tag.
              </video>
            )}
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-yellow-500 text-xl">
                  {star <= rev.Stars ? "⭐" : "☆"}
                </span>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default PDetails;
