import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import FiveStars from "../Assets/five-stars.svg";

const reviewsData = [];

const ReviewItem = ({ img, name, text }) => (
  <div className="item">
    <div className="reviews-box">
      <img
        src={img}
        alt="Avatar"
        width={55}
        height={55}
        style={{ marginLeft: "15px", marginTop: "15px" }}
      />
      <h2 className="reviews-title">{name}</h2>
      <p className="reviews-text">{text}</p>
      <img
        src={FiveStars}
        alt="FiveStars"
        height={20}
        style={{ marginLeft: "20px" }}
      />
    </div>
  </div>
);

function Reviews() {
  return <></>;
}

export default Reviews;
