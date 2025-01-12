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
              // onClick={() => {
              //   window.scroll(0, 0);
              // }}
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
      
      </section>
      <div className="pre-footer-back">
      
      </div>
    </>
  );
}

export default Banners;
