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
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);
  // console.log(loaded);

  let viewportWidth = window.innerWidth;
  // console.log(viewportWidth);

  let HeroMicroondas;

  if (viewportWidth < 600) {
    HeroMicroondas = HeroMicroondasMobile;
  } else {
    HeroMicroondas = HeroMicroondasDesktop;
  }
  console.log(HeroMicroondas);

  if (loaded === false) {
    return (
      <>
        <div>Cargando!!</div>
      </>
    );
  }
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
        <h3 className="product-title-categories">
          ENCUENTRA TU MICROONDAS PERFECTO
        </h3>
        <div className="product-box-cont-categories">
          <div className="product-box-category bla">
            <img
              src={ProductMicro1}
              className="product-category-img"
              width={299}
              alt="category-img"
            />
            <p className="product-name">Microondas Digital 20 Litros</p>
            <p className="product-subtitle">
              10 niveles de potencia y diferentes <br></br> programas de cocción
              automática.
              <br></br> Hecho para tí.
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
              src={ProductMicro2}
              className="product-category-img"
              width={299}
              alt="category-img"
            />
            <p className="product-name">Microondas Digital 23 Litros</p>
            <p className="product-subtitle">
              10 niveles de potencia y diferentes <br></br> programas de cocción
              automática.
              <br></br> Hecho para tí.
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

      {/* { if (isTablet)(<h2>You have unread messages.</h2>)} */}

      <>
        <div className="product-cont-categories">
          <h3 className="i-text-prod-mob">
            Más que una heladera, <br></br> una experiencia.
          </h3>
        </div>
        <Carousel
          fade
          controls={false}
          indicators={true}
          pause={false}
          interval={3000}
        >
          <Carousel.Item>
            <div
              className="hero-products-mob"
              style={{ backgroundImage: `url(${EmocionalMob1})` }}
            ></div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              className="hero-products-mob"
              style={{ backgroundImage: `url(${EmocionalMob2})` }}
            ></div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              className="hero-products-mob"
              style={{ backgroundImage: `url(${EmocionalMob3})` }}
            ></div>
          </Carousel.Item>
        </Carousel>
      </>
    </>
  );
}

export default Microondas;
