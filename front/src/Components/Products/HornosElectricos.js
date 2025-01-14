import React from "react";
import "./Product.css";
import Carousel from "react-bootstrap/Carousel";
import HeroHornosDesktop from "../../Assets/products/hornos-electricos/hero-horno.jpg";
import HeroHornosMobile from "../../Assets/products/hornos-electricos/hero-horno-2.jpg";
import FirstCarousel from "../../Assets/products/hornos-electricos/carousel-hornos-1.jpg";
import SecondCarousel from "../../Assets/products/hornos-electricos/carousel-hornos-2.jpg";
import ThirdCarousel from "../../Assets/products/hornos-electricos/carousel-hornos-3.jpg";
import ProductHornos1 from "../../Assets/products/hornos-electricos/Productos/hornito-23lts-1.webp";
import ProductHornos2 from "../../Assets/products/hornos-electricos/Productos/hornito-36lts-1.webp";
import ProductHornos3 from "../../Assets/products/hornos-electricos/Productos/hornito-42lts-1.webp";
import ProductHornos4 from "../../Assets/products/hornos-electricos/Productos/hornito-55lts-1.webp";
import HeroHornosMob1 from "../../Assets/products/hornos-electricos/carousel-mob-hornos-1.jpg";
import HeroHornosMob2 from "../../Assets/products/hornos-electricos/carousel-mob-hornos-2.jpg";
import HeroHornosMob3 from "../../Assets/products/hornos-electricos/carousel-mob-hornos-3.jpg";

function HornosElectricos() {
  return (
    <>
      <div className="product-hero-cont"></div>

      {viewportWidth > 600 ? <></> : <></>}
    </>
  );
}

export default HornosElectricos;
