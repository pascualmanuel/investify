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
        <Carousel fade controls={false} indicators={false} interval={null}>
          <Carousel.Item>
            <div
              className="hero1"
              style={{
                height: "600px",
                backgroundImage: `url(${HeroHeladera})`,
              }}
            ></div>
            <Carousel.Caption>
              <div className="product-hero-sub-cont">
                <div className="product-hero-left">
                  <div className="product-banner">
                    <h3 className="product-banner-title">Heladeras</h3>
                    <p className="product-banner-subtitle">
                      <span style={{ fontWeight: "200" }}>que superan</span>
                      <br></br>
                      tus expectativas
                    </p>
                  </div>
                </div>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="product-cont-categories"></div>
    </>
  );
}

export default Heladeras;
