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
  let viewportWidth = window.innerWidth;
  console.log(viewportWidth);

  let HeroLavadoras;

  if (viewportWidth < 600) {
    HeroLavadoras = HeroLavadorasMobile;
  } else {
    HeroLavadoras = HeroLavadorasDesktop;
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
          <div className="product-box-category bla">
            <img
              src={ProductLavadora}
              className="product-category-img"
              width={180}
              alt="category-img"
            />
            <p className="product-name">Lavadora de Carga Superior 8 Kg</p>
            <p className="product-subtitle">
              6 programas de lavado y la mayor <br></br> eficiencia energética..
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
            <div className="parent-hover">
              <img
                src={ProductLavadora2}
                className="product-category-img"
                width={180}
                alt="category-img"
                // id="img1"
              />
              {/* <img
                src={ProductLavadora2}
                className="product-category-img"
                width={180}
                alt="category-img"
                id="img2"
                // style={{ display: "none" }}
              /> */}
            </div>
            <p className="product-name">Lavadora de Carga Superior 14 Kg</p>
            <p className="product-subtitle">
              6 programas de lavado y la mayor <br></br> eficiencia energética..
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
              src={ProductLavadora3}
              className="product-category-img"
              width={180}
              alt="category-img"
            />
            <p className="product-name">Lavadora de Carga Superior 17 Kg</p>
            <p className="product-subtitle">
              6 programas de lavado y la mayor <br></br> eficiencia energética..
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
              src={ProductLavadora4}
              className="product-category-img"
              width={180}
              alt="category-img"
            />
            <p className="product-name">Lavadora de Carga Superior 17 Kg</p>
            <p className="product-subtitle">
              6 programas de lavado y la mayor <br></br> eficiencia energética..
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
              src={ProductLavadora5}
              className="product-category-img"
              width={180}
              alt="category-img"
            />
            <p className="product-name">Secadora 7 KG</p>
            <p className="product-subtitle">
              6 programas de lavado y la mayor <br></br> eficiencia energética..
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
      {viewportWidth > 600 ? (
        <>
          <div className="product-cont-categories">
            <h3 className="i-text-prod">
              Lavadoras y secadoras de alta tecnología.
            </h3>
            <div className="product-hero">
              <Carousel
                slide
                controls={true}
                indicators={true}
                pause={false}
                interval={3000}
              >
                <Carousel.Item>
                  <div
                    className="hero-products"
                    style={{ backgroundImage: `url(${FirstCarousel})` }}
                  ></div>
                </Carousel.Item>
                <Carousel.Item>
                  <div
                    className="hero-products"
                    style={{ backgroundImage: `url(${SecondCarousel})` }}
                  ></div>
                </Carousel.Item>
                <Carousel.Item>
                  <div
                    className="hero-products"
                    style={{ backgroundImage: `url(${ThirdCarousel})` }}
                  ></div>
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="product-cont-categories">
            <h3 className="i-text-prod-mob">
              Lavadoras y secadoras <br></br> de alta tecnología.
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
      )}
    </>
  );
}

export default Lavadoras;
