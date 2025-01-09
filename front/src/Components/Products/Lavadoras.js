import React from "react";
import "./Product.css";
import Carousel from "react-bootstrap/Carousel";

function Lavadoras() {
  return (
    <>
      <div className="product-hero-cont"></div>

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
