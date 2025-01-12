import React from "react";
import Hero from "./Hero";
import Paris from "../../Assets/paris-cencosud.png";
import { Link } from "react-router-dom";
import "./Hero.css";

function Banners() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  let viewportWidth = window.innerWidth;

  let HeroMicroondas;

  if (viewportWidth < 600) {
    Paris;
    HeroMicroondas = Paris;
  } else {
    HeroMicroondas = Paris;
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
      <section className="micro-banner-cont">
        <div className="micro-banner-left"></div>
        <div className="micro-banner-right">
          <p className="micro-banner-sub">MICROONDAS DIGITAL</p>
          <h3 className="micro-banner-title">
            tu comida <br className="br-500" /> de ayer,
            <br className="br-500" /> es más &nbsp;
            <br className="br-1376" />
            rica hoy
          </h3>
          <p className="micro-banner-p">
            10 niveles de potencia y diferentes <br className="br-500" />
            opciones de
            <br className="br-banner-micro" /> cocción predeterminadas.
          </p>
          <div className="cta-banner-cont">
            <a href="" className="cta-tienda" style={{ marginLeft: "0px" }}>
              Ver en tienda
            </a>
            <Link to={"/microondas"} className="cta-banner">
              Más info
            </Link>
          </div>
        </div>
      </section>
      <section className="micro-banner-cont-hpt"></section>
      <section className="micro-banner-cont-hpt-mob"></section>

      <section className="freezer-banner-cont">
        <div className="micro-banner-left" id="freezer-img"></div>
        <div className="micro-banner-right">
          <p className="micro-banner-sub">FREEZER </p>
          <h3 className="micro-banner-title">
            un freezer <br></br>para cada hogar
          </h3>
          <p className="micro-banner-p">
            Tus alimentos refrigerados de forma <br className="br-500" />
            ecológica
            <br className="br-banner-micro" />e inteligente.
          </p>
          <div className="cta-banner-cont">
            <a href="" className="cta-tienda" style={{ marginLeft: "0px" }}>
              Ver en tienda
            </a>
            <Link
              to="/freezers"
              onClick={() => {
                window.scroll(0, 0);
              }}
              className="cta-banner"
            >
              Más info
            </Link>
          </div>
        </div>
      </section>

      <section className="daewoo-banner-cont">
        <div className="daewoo-banner-left">
          <h3 className="daewoo-banner-title">
            SOMOS UNA <br></br>MARCA COREANA
          </h3>
          <p className="daewoo-banner-p">
            <span className="light"> Líder mundial</span> <br></br>en
            tecnologías digitales.
          </p>
          <div className="square">
            <div className="sq one">
              <div className="sq-aux">
                <span id="blabla">+</span>
                <h3 className="daewoo-stats-1">90</h3>
              </div>
              <p className="daewoo-stats-sub">Años de experiencia</p>
            </div>
            <div className="sq two">
              <div className="sq-aux">
                <span id="blabla">+</span>
                <h3 className="daewoo-stats-2">3,5k</h3>
              </div>
              <p className="daewoo-stats-sub">marcas registradas</p>
            </div>
            <div className="sq three">
              <div className="sq-aux">
                <span id="blabla">+</span>
                <h3 className="daewoo-stats-3">160</h3>
              </div>
              <p className="daewoo-stats-sub">Paises</p>
            </div>
            <div className="sq four">
              <div className="sq-aux">
                <span id="blabla">+</span>
                <h3 className="daewoo-stats-4 ">1m</h3>
              </div>
              <p className="daewoo-stats-sub">hogares usan daewoo</p>
            </div>
          </div>
        </div>
        <div className="daewoo-banner-right"></div>
        <p className="daewoo-banner-p-mob">
          <span className="light"> Líder mundial</span> <br></br>en tecnologías
          digitales.
        </p>
        <h3 className="daewoo-banner-title-mob">
          SOMOS UNA <br></br>MARCA COREANA
        </h3>
      </section>
      <div className="pre-footer-back">
        <div className="pre-footer">
          <h3 className="pre-footer-text">
            Encuéntranos<br></br>en tienda Paris
          </h3>
          <a href="" className="cta-pre-footer" style={{ marginLeft: "0px" }}>
            Ver productos en tienda
          </a>
          <img src={Paris} height={100} />
        </div>
      </div>
      {viewportWidth > 600 ? (
        <></>
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

export default Banners;
