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
  

  const items = reviewsData.map((review, index) => (
    <ReviewItem
      key={index}
      img={review.img}
      name={review.name}
      text={review.text}
    />
  ));

  return (
    <div
      style={{
        backgroundColor: "rgba(247, 248, 248, 1)",
        paddingBottom: "100px",
      }}
    >
      <div className="reviews-container max-2000">
        <p>Lo que dicen los Usuarios</p>
        <h2>
          Comunidad
          <span style={{ color: "#5d80ff" }}> Manno. </span>
        </h2>
      </div>
      <AliceCarousel
        mouseTracking
        items={items}
        responsive={responsive}
        controlsStrategy="alternate"
        infinite={true}
        autoPlay={true}
        autoPlayInterval={2000}
        disableButtonsControls={true}
        disableDotsControls={true}
        autoPlayStrategy="none"
        paddingLeft={50}
      />
    </div>
  );
}

export default Reviews;
