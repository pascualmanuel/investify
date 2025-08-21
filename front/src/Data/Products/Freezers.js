import React from "react";
import "./Product.css";
import Carousel from "react-bootstrap/Carousel";
import HeroFreezer from "../../Assets/products/freezers/hero-freezer.webp";
import ProductFreezer1 from "../../Assets/products/freezers/Productos/freezer-142lts-1.webp";
import ProductFreezer2 from "../../Assets/products/freezers/Productos/freezer-199lts-1.webp";
import ProductFreezer3 from "../../Assets/products/freezers/Productos/freezer-99lts-1.webp";
import EmocionalMob1 from "../../Assets/products/freezers/carousel-mob-freezer-1.jpg";
import EmocionalMob2 from "../../Assets/products/freezers/carousel-mob-freezer-2.jpg";
import EmocionalDesk from "../../Assets/products/freezers/carousel-desk-freezer-1.jpg";
import EmocionalDesk2 from "../../Assets/products/freezers/carousel-desk-freezer-2.jpg";

function Freezers() {
  let viewportWidth = window.innerWidth;
  console.log(viewportWidth);
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

      <div className="product-cont-categories">
        <h3 className="product-title-categories">
          Encuentra tu freezer perfecto
        </h3>
        <div className="product-box-cont-categories">
          <div className="product-box-category bla">
            <img
              src={ProductFreezer1}
              className="product-category-img"
              width={180}
              alt="category-img"
            />
            <p className="product-name">Freezer Horizontal 99 lts</p>
            <p className="product-subtitle">
              Congela o refrigera tus alimentos con el <br></br> menor consumo
              de energía posible.
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
              src={ProductFreezer2}
              className="product-category-img"
              width={180}
              alt="category-img"
            />
            <p className="product-name">Freezer Horizontal 142 lts</p>
            <p className="product-subtitle">
              Congela o refrigera tus alimentos con el <br></br> menor consumo
              de energía posible.
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
              src={ProductFreezer3}
              className="product-category-img"
              width={180}
              alt="category-img"
            />
            <p className="product-name">Freezer Horizontal 199 Lts</p>
            <p className="product-subtitle">
              Congela o refrigera tus alimentos con el <br></br> menor consumo
              de energía posible.
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
              Más que un freezer, una experiencia.
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
                    style={{ backgroundImage: `url(${EmocionalDesk})` }}
                  ></div>
                </Carousel.Item>
                <Carousel.Item>
                  <div
                    className="hero-products"
                    style={{ backgroundImage: `url(${EmocionalDesk2})` }}
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
              Más que un freezer, una <br></br> experiencia
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
          </Carousel>
        </>
      )}
    </>
  );
}

export default Freezers;
