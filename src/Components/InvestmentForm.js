// src/components/InvestmentForm.js
import React, { useState } from "react";
import Many from "../Assets/manyy.JPG";
const InvestmentForm = ({ addInvestment }) => {
  const [crypto, setCrypto] = useState("BTC");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (crypto && amount > 0 && date) {
      addInvestment({ crypto, amount: parseFloat(amount), date });
      setCrypto("BTC");
      setAmount("");
      setDate("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={crypto}
        onChange={(e) => setCrypto(e.target.value)}
        required
      >
        <option value="BTC">Bitcoin (BTC)</option>
        <option value="ETH">Ethereum (ETH)</option>
        <option value="ADA">Cardano (ADA)</option>
        <option value="SOL">Solana (SOL)</option>
      </select>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Monto"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Añadir Inversión</button>
      <img src={Many} />
    </form>
  );
};

export default InvestmentForm;
