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

function App() {
  const [investments, setInvestments] = useState([]);
  const [chartData, setChartData] = useState([]);

  const addInvestment = async (investment) => {
    try {
      const formattedDate = investment.date.split("-").reverse().join("-");
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${investment.crypto.toLowerCase()}/history?date=${formattedDate}`
      );
      const price = response.data.market_data?.current_price?.usd || 0; // Manejar caso si `current_price` no está presente
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
    </div>
  );
}

export default App;
