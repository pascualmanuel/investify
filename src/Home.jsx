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
import SmoothScroll from "./Components/SmoothScroll";

const Home = () => {
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
      <div className="App">
        River plate es más grande
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
        <div style={{ height: "100vh", backgroundColor: "lime" }}></div>
        <div style={{ height: "100vh", backgroundColor: "lightskyblue" }}></div>
        <div style={{ height: "100vh", backgroundColor: "mediumpurple" }}></div>
        <div style={{ height: "100vh", backgroundColor: "orchid" }}></div>
        <div style={{ height: "100vh", backgroundColor: "red" }}></div>
        <div style={{ height: "100vh", backgroundColor: "orange" }}></div>
      </div>
    </>
  );
};

export default Home;
