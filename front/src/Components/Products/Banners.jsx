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
        <>
          <div className="product-cont-categories">
            <h3 className="i-text-prod">
              Lavadoras y secadoras de alta tecnología.
            </h3>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Banners;
