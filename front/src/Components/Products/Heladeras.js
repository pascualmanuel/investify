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
      <div className="product-cont-categories">
        <h3 className="product-title-categories">
          ENCUENTRA TU HELADERA PERFECTA
        </h3>

        <div className="product-box-cont-categories">
          <div className="product-box-category bla">
            <img
              src={ProductHeladera}
              className="product-category-img"
              width={160}
              alt="category-img"
            />
            <p className="product-name">Side By Side 562 Litros Inverter</p>
            <p className="product-subtitle">
              Refrigera tus alimentos de manera <br></br> inteligente y
              consciente. <br></br> Hecho para tí.
            </p>
            <a
              href={`https://www.paris.cl/search?q=Daewoo&prefn1=isMarketplace&prefv1=Paris`}
              target="_blank"
              className="cta-product"
              style={{ marginLeft: "0px" }}
            >
              Ver en tienda
            </a>
          </div>
          <div className="product-box-category bla">
            <img
              src={ProductHeladera2}
              className="product-category-img"
              width={160}
              alt="category-img"
            />
            <p className="product-name"> Top Mount 251 Litros</p>
            <p className="product-subtitle">
              Refrigera tus alimentos de manera <br></br> inteligente y
              consciente. <br></br> Hecho para tí.
            </p>
            <a
              href={`https://www.paris.cl/search?q=Daewoo&prefn1=isMarketplace&prefv1=Paris`}
              target="_blank"
              className="cta-product"
              style={{ marginLeft: "0px" }}
            >
              Ver en tienda
            </a>
          </div>
          <div className="product-box-category bla">
            <img
              src={ProductHeladera5}
              className="product-category-img"
              width={160}
              alt="category-img"
            />
            <p className="product-name">French Door 408 Litros Inverter</p>
            <p className="product-subtitle">
              Refrigera tus alimentos de manera <br></br> inteligente y
              consciente. <br></br> Hecho para tí.
            </p>
            <a
              href={`https://www.paris.cl/search?q=Daewoo&prefn1=isMarketplace&prefv1=Paris`}
              target="_blank"
              className="cta-product"
              style={{ marginLeft: "0px" }}
            >
              Ver en tienda
            </a>
          </div>
          <div className="product-box-category bla">
            <img
              src={ProductHeladera4}
              className="product-category-img"
              width={160}
              alt="category-img"
            />
            <p className="product-name"> Top Mount 348 Litros</p>
            <p className="product-subtitle">
              Refrigera tus alimentos de manera <br></br> inteligente y
              consciente. <br></br> Hecho para tí.
            </p>
            <a
              href={`https://www.paris.cl/search?q=Daewoo&prefn1=isMarketplace&prefv1=Paris`}
              target="_blank"
              className="cta-product"
              style={{ marginLeft: "0px" }}
            >
              Ver en tienda
            </a>
          </div>
          <div className="product-box-category bla">
            <img
              src={ProductHeladera3}
              className="product-category-img"
              width={160}
              alt="category-img"
            />
            <p className="product-name">Bottom Freezer 317 Litros Inverter</p>
            <p className="product-subtitle">
              Refrigera tus alimentos de manera <br></br> inteligente y
              consciente. <br></br> Hecho para tí.
            </p>
            <a
              href={`https://www.paris.cl/search?q=Daewoo&prefn1=isMarketplace&prefv1=Paris`}
              target="_blank"
              className="cta-product"
              style={{ marginLeft: "0px" }}
            >
              Ver en tienda
            </a>
          </div>
        </div>
      </div>


      {viewportWidth > 600 ? <></> : <></>}
    </>
  );
}

export default Heladeras;
