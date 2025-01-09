import React from "react";
import "./Product.css";
import Carousel from "react-bootstrap/Carousel";
import HeroLavadorasDesktop from "../../Assets/products/lavadoras/hero-lavadora.jpg";
import HeroLavadorasMobile from "../../Assets/products/lavadoras/hero-lavadora-2.jpg";
import ProductLavadora from "../../Assets/products/lavadoras/Productos/lavdora-14kg-1.webp";
import ProductLavadora2 from "../../Assets/products/lavadoras/Productos/lavdora-17kg.webp";
import ProductLavadora3 from "../../Assets/products/lavadoras/Productos/lavdora-8kg.webp";
import ProductLavadora4 from "../../Assets/products/lavadoras/Productos/lavadora-secadora.webp";
import ProductLavadora5 from "../../Assets/products/lavadoras/Productos/secadora-7kg3.webp";

import EmocionalMob1 from "../../Assets/products/lavadoras/carousel-mob-lavadora-1.jpg";
import EmocionalMob2 from "../../Assets/products/lavadoras/carousel-mob-lavadora-2.jpg";
import EmocionalMob3 from "../../Assets/products/lavadoras/carousel-mob-lavadora-3.jpg";
import FirstCarousel from "../../Assets/products/lavadoras/carousel-lavadora-1.jpg";
import SecondCarousel from "../../Assets/products/lavadoras/carousel-lavadora-3.jpg";
import ThirdCarousel from "../../Assets/products/lavadoras/carousel-lavadora-2.jpg";

function Lavadoras() {

  return (
    <>
      <div className="product-hero-cont">
        <Carousel fade controls={false} indicators={false} interval={null}>
          <Carousel.Item>
            <div
              className="hero1"
              style={{
                height: "600px",
                backgroundImage: `url(${HeroLavadoras})`,
              }}
            ></div>
            <Carousel.Caption>
              <div className="product-hero-sub-cont">
                <div className="product-hero-left">
                  <div className="product-banner">
                    <h3 className="product-banner-title">Lavadoras</h3>
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

      <div className="product-cont-categories">
        <h3 className="product-title-categories">
          Encuentra tu lavadora o secadora perfecta
        </h3>
        <div className="product-box-cont-categories">
          <div className="product-box-category bla"></div>
        </div>
      </div>
      {/* { if (isTablet)(<h2>You have unread messages.</h2>)} */}
      
    </>
  );
}

export default Lavadoras;
