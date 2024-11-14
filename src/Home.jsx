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

import ShoppingList from "./Components/ShippingList";
import Friends from "./Components/Friends";
import SmoothScroll from "./Components/SmoothScroll";
import ChatBot from "./Components/ChatBot/Chatbot";

const Home = () => {
  return (
    <>
      <div className="App">
        <ChatBot />
      </div>
    </>
  );
};

export default Home;
