import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import FiveStars from "../Assets/five-stars.svg";
import Mujer1 from "../Assets/Personitas/Mujer1.png";
import Mujer2 from "../Assets/Personitas/Mujer2.png";
import Mujer3 from "../Assets/Personitas/Mujer3.png";
import Mujer4 from "../Assets/Personitas/Mujer4.png";
import Mujer5 from "../Assets/Personitas/Mujer5.png";
import Mujer6 from "../Assets/Personitas/Mujer6.png";
import Mujer7 from "../Assets/Personitas/Mujer7.png";
import Hombre1 from "../Assets/Personitas/Hombre1.png";
import Hombre2 from "../Assets/Personitas/Hombre2.png";
import Hombre3 from "../Assets/Personitas/Hombre3.png";
import Hombre4 from "../Assets/Personitas/Hombre4.png";
import Hombre5 from "../Assets/Personitas/Hombre5.png";

const reviewsData = [
  {
    img: Hombre3,
    name: "Matías",
    text: "Super recomendable, explico el paso a paso de lo que hacia y me dio consejos a tener en cuenta para el mantenimiento de la cocina.",
  },
  {
    img: Mujer2,
    name: "Paula",
    text: "Impecable. Vino al toque. Instaló la hamaca. Quedó perfecto. gracias!",
  },
  {
    img: Mujer7,
    name: "Guadalupe",
    text: "Super puntual! Prolijo, profesional, süper recomendable. quedó todo perfecto. Muchas gracias",
  },
  {
    img: Hombre2,
    name: "Fernando",
    text: "Fue puntual, trabajo my bien, profesional.",
  },
  {
    img: Mujer1,
    name: "Monica",
    text: "Excelente todo , hasta me trajo una aspiradora para tener mientras arreglaba la mia. IMPECABLE!!!",
  },
];

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
  const responsive = {
    300: { items: 1 },
    535: { items: 2 },
    830: { items: 3 },
    1060: { items: 4 },
  };

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
