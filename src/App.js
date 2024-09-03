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
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/friends" element={<Friends />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
