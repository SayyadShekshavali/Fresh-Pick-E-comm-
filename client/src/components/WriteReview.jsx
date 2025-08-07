import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { WriteReviewStore } from "../store/userProductupload";
import { useNavigate } from "react-router-dom";
function WriteReview() {
  const Navg = useNavigate();
  const [rate, setRating] = useState(5);
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const { review } = WriteReviewStore();
  const { id } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      id: id,
      rate: rate,
      comment: comment,
      image: image,
      video: video,
    };
    console.log("Submitted form data", formData);
    await review({
      id: id,
      stars: rate,
      comment: comment,
      Image: image,
      Video: video,
    });
    setRating(5);

    setComment("");
    setImage(null);
    setVideo(null);
  };
  const handleClick = (value) => {
    setStars(value);
    setRating(value);
  };
  return (
    <div className=" space-x-8 p-10">
      <div className="flex flex-col items-center">
        <form onSubmit={handleSubmit}>
          <p>Rate in Stars:</p>
          <div className="text-4xl text-yellow-400 mb-2">
            {[1, 2, 3, 4, 5].map((star, index) => (
              <span
                key={`star-${index}`}
                onClick={() => handleClick(star)}
                style={{ cursor: "pointer", marginRight: 5 }}
                onChange={(e) => setStars(e.target.value)}
              >
                {star <= stars ? "★" : "☆"}
              </span>
            ))}
          </div>
          <textarea
            className="h-30 w-70 p-2 "
            placeholder="Write comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <p>Upload Image</p>
          <input
            type="file"
            name="Image"
            accept="image/*"
            placeholder="Image url"
            className="m-5 border-2 border-black p-1 rounded-xl"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) setImage(file);
            }}
          />
          <p>Upload Video</p>
          <input
            type="file"
            name="Video"
            accept="video/*"
            placeholder="Video url"
            className="m-5 border-2 border-black p-1 rounded-xl"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) setVideo(file);
            }}
          />
          <button
            type="Submit"
            className="p-3 px-6 rounded-xl !bg-teal-500 shadow-2xl font-bold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default WriteReview;
