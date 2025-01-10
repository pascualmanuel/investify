import React, { useState, useEffect } from "react";
import "./Product.css";
import Carousel from "react-bootstrap/Carousel";
import HeroMicroondasDesktop from "../../Assets/products/microondas/carousel-microondas-min.jpg";
import HeroMicroondasMobile from "../../Assets/products/microondas/hero-microondas-2.jpg";
import ProductMicro1 from "../../Assets/products/microondas/Productos/microondas-20lts-1.webp";
import ProductMicro2 from "../../Assets/products/microondas/Productos/microondas-23lts-1.webp";
import EmocionalMob1 from "../../Assets/products/microondas/emocional-mob-1.jpg";
import EmocionalMob2 from "../../Assets/products/microondas/emocional-mob-2.jpg";
import EmocionalMob3 from "../../Assets/products/microondas/emocional-mob-3.jpg";
import FirstCarousel from "../../Assets/products/microondas/carousel-microondas-1.jpg";
import SecondCarousel from "../../Assets/products/microondas/carousel-microondas-3.jpg";
import ThirdCarousel from "../../Assets/products/microondas/carousel-microondas-2.jpg";

function Microondas() {
  return (
    <>
      <div className="product-hero-cont">
        <Carousel fade controls={false} indicators={false} interval={null}>
          <Carousel.Item>
            <div
              className="hero1"
              style={{
                height: "600px",
                backgroundImage: `url(${HeroMicroondas})`,
              }}
            ></div>
            <Carousel.Caption>
              <div className="product-hero-sub-cont">
                <div className="product-hero-left">
                  <div className="product-banner">
                    <h3 className="product-banner-title">Microondas</h3>
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
        
        <div className="product-box-cont-categories">
          
          
        </div>
      </div>

      {/* { if (isTablet)(<h2>You have unread messages.</h2>)} */}
    </>
  );
}

export default Microondas;
