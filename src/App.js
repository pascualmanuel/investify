// src/App.js
import React, { useState } from "react";
import InvestmentChart from "./components/InvestmentChart";
import InvestmentForm from "./components/InvestmentForm";
import InvestmentChart from "./components/InvestmentChart";
import InvestmentList from "./components/InvestmentList";
import InvestmentChart from "./components/InvestmentChart";
import InvestmentChart from "./components/InvestmentChart";
import { sampleData } from "./data/sampleData";
import "./styles/App.css";

function App() {
  const [investments, setInvestments] = useState([]);

  const addInvestment = (investment) => {
    setInvestments([...investments, investment]);
  };

  return (
    <div className="App">
      <h1>Simulador de Inversiones</h1>
    </div>
  );
}

export default App;
