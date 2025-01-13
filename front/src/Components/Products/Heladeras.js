import React from "react";
import "./Product.css";
import Carousel from "react-bootstrap/Carousel";
import HeroHeladerasDesktop from "../../Assets/products/heladeras/hero-heladera.jpg";
import HeroHeladerasMobile from "../../Assets/products/heladeras/heladerasmob.jpg";
import FirstCarousel from "../../Assets/products/heladeras/carousel-heladera-1.jpg";
import SecondCarousel from "../../Assets/products/heladeras/carousel-heladera-2.jpg";
import ThirdCarousel from "../../Assets/products/heladeras/carousel-heladera-3.jpg";
import ProductHeladera from "../../Assets/products/heladeras/Productos/heladera-152lts-1.webp";
import ProductHeladera2 from "../../Assets/products/heladeras/Productos/heladera-251lts-1.webp";
import ProductHeladera3 from "../../Assets/products/heladeras/Productos/heladera-317lts-1.webp";
import ProductHeladera4 from "../../Assets/products/heladeras/Productos/heladera-348lts-1.webp";
import ProductHeladera5 from "../../Assets/products/heladeras/Productos/heladera-408lts-1.webp";
import HeroMicroondasMob1 from "../../Assets/products/heladeras/carousel-mob-heladera-1.png";
import HeroMicroondasMob2 from "../../Assets/products/heladeras/carousel-mob-heladera-2.png";
import HeroMicroondasMob3 from "../../Assets/products/heladeras/carousel-mob-heladera-3.png";
import { useState, useEffect, useRef } from "react";

function Heladeras() {
  const [loading, setLoading] = useState("");

  let viewportWidth = window.innerWidth;

  let HeroHeladera;

  if (viewportWidth < 600) {
    HeroHeladera = HeroHeladerasMobile;
  } else {
    HeroHeladera = HeroHeladerasDesktop;
  }
  console.log(HeroHeladera);
  return (
    <>
      <div className="product-hero-cont">
       
      </div>
      <div className="product-cont-categories"></div>
    </>
  );
}

export default Heladeras;
