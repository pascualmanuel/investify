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
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const Home = () => {
  useEffect(() => {
    // Example of a simple scroll animation
    gsap.to(".scroll-element", {
      scrollTrigger: {
        trigger: ".scroll-element",
        start: "top center", // Start the animation when the top of the element hits the center of the viewport
        end: "bottom top", // End the animation when the bottom of the element hits the top of the viewport
        scrub: true, // Smooth scrubbing, takes 1 second to "catch up" to the scrollbar
      },
      x: 100, // Example of a property to animate
      opacity: 1,
    });
  }, []);

  const [investments, setInvestments] = useState([]);
  const [chartData, setChartData] = useState([]);

  const addInvestment = async (investment) => {
    try {
      const formattedDate = investment.date.split("-").join("-");
      console.log(formattedDate);

      const response = await axios.get(
        `https://api.bluelytics.com.ar/v2/historical?day=${formattedDate}`
      );
      console.log(response);
      const price = response?.data.blue?.value_sell || 0; // Manejar caso si `current_price` no está presente

      const newInvestment = {
        ...investment,
        price,
      };
      setInvestments([...investments, newInvestment]);
    } catch (error) {
      console.error("Error fetching the crypto data:", error.message);
    }
  };

  useEffect(() => {
    // Transformar los datos de inversiones en el formato adecuado para el gráfico
    const data = investments.map((inv, index) => ({
      name: inv.crypto,
      amount: inv.amount * inv.price,
    }));
    setChartData(data);
  }, [investments]);

  return (
    <>
      {" "}
      <div className="App">
        <h1>Simulador de Inversiones</h1>
        <InvestmentForm addInvestment={addInvestment} />
        <InvestmentList investments={investments} />
        <InvestmentChart data={chartData} />
        <LimitedCounter />
        <RandomImageGallery />
        <CurrencyConverter />
        <TrafficLight />
        <RandomQuoteGenerator />
        <DigitalClock />
        <DogAgeCalculator />
        <ShoppingList />
      </div>
    </>
  );
};

export default Home;
