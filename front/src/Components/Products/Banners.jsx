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
