import React from "react";
import "./Product.css";
import Carousel from "react-bootstrap/Carousel";
import HeroFreezer from "../../Assets/products/freezers/hero-freezer.webp";


function Freezers() {

  return (
    <>
      <div className="product-hero-cont">
        <Carousel fade controls={false} indicators={false} interval={null}>
          <Carousel.Item>
            <div
              className="hero1"
              style={{
                height: "600px",
                backgroundImage: `url(${HeroFreezer})`,
              }}
            ></div>
            <Carousel.Caption>
              <div className="product-hero-sub-cont">
                <div className="product-hero-left">
                  <div className="product-banner">
                    <h3 className="product-banner-title">Freezers</h3>
                    <p className="product-banner-subtitle">
                      <span style={{ fontWeight: "200" }}>CONSCIENTES CON</span>
                      <br></br>
                      EL MEDIO AMBIENTE
                    </p>
                  </div>
                </div>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
}

export default Freezers;
