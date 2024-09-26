// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import InvestmentForm from "./Components/InvestmentForm";
import InvestmentList from "./Components/InvestmentList";
import InvestmentChart from "./Components/InvestmentChart";
import "./Styles/App.css";
import ReactDOM from "react";
import LimitedCounter from "./Components/LimitedCounter";
import RandomImageGallery from "./Components/RandomImageGallery";
import CurrencyConverter from "./Components/CurrencyConverter";
import TrafficLight from "./Components/TrafficLight";
import RandomQuoteGenerator from "./Components/RandomQuote";
import DigitalClock from "./Components/DigitalClock";
import DogAgeCalculator from "./Components/DogAgeCalculator";
import ShoppingList from "./Components/ShippingList";
import Friends from "./Components/Friends";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "./Components/SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {

    gsap.to(".scroll-element", {
      scrollTrigger: {
        trigger: ".scroll-element",
        start: "top center", // Start the animation when the top of the element hits the center of the viewport
        end: "bottom top", // End the animation when the bottom of the element hits the top of the viewport
        scrub: true, // Smooth scrubbing, takes 1 second to "catch up" to the scrollbar
      },
      x: 100, 
      opacity: 1,
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/scroll" element={<SmoothScroll />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
