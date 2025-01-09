import React from "react";
import "./Product.css";
import Carousel from "react-bootstrap/Carousel";

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
