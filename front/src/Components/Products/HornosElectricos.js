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
  let viewportWidth = window.innerWidth;
  console.log(viewportWidth);

  let HeroImage;

  if (viewportWidth < 600) {
    HeroImage = HeroHornosMobile;
  } else {
    HeroImage = HeroHornosDesktop;
  }
  console.log(HeroImage);
  return (
    <>
      <div className="product-hero-cont">
        <Carousel fade controls={false} indicators={false} interval={null}>
          <Carousel.Item>
            <div
              className="hero1"
              style={{ height: "600px", backgroundImage: `url(${HeroImage})` }}
            ></div>
            <Carousel.Caption>
              <div className="product-hero-sub-cont">
                <div className="product-hero-left">
                  <div className="product-banner">
                    <h3
                      className="product-banner-title"
                      style={{
                        paddingBottom: "0px",
                      }}
                    >
                      hornos <br></br> electricos
                    </h3>
                    <p className="product-banner-subtitle">
                      <span style={{ fontWeight: "200", marginTop: "-18px" }}>
                        hecho para tí
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="product-cont-categories">
        <h3 className="product-title-categories">
          Encuentra tu hornito perfecto
        </h3>
      </div>

      {viewportWidth > 600 ? <></> : <></>}
    </>
  );
}

export default HornosElectricos;
