import React from "react";
import Hero from "./Hero";
import Paris from "../../Assets/paris-cencosud.png";
import { Link } from "react-router-dom";
import "./Hero.css";

function Banners() {
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
       
      </section>

      <section className="daewoo-banner-cont"></section>
      <div className="pre-footer-back"></div>
    </>
  );
}

export default Banners;
