// src/App.js
import React, { useState } from "react";
import InvestmentForm from "./Components/InvestmentForm";
import InvestmentList from "./Components/InvestmentList";
import InvestmentChart from "./Components/InvestmentChart";

import { sampleData } from "./Data/sampleData";
import "./Styles/App.css";

function App() {
  const [investments, setInvestments] = useState([]);
  const [chartData, setChartData] = useState([]);

  const addInvestment = (investment) => {
    setInvestments([...investments, investment]);
  };

  useEffect(() => {
    const data = investments.map((inv, index) => ({
      name: `Inv ${index + 1}`,
      amount: inv.amount,
    }));
    setChartData(data);
  }, [investments]);

  return (
    <div className="App">
      <h1>Simulador de Inversiones</h1>
      <InvestmentForm addInvestment={addInvestment} />
      <InvestmentList investments={investments} />
      <InvestmentChart data={chartData} />
    </div>
  );
}

export default App;
