// src/components/InvestmentForm.js
import React, { useState } from "react";

const InvestmentForm = ({ addInvestment }) => {
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addInvestment({ type, amount: parseFloat(amount) });
    setType("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={type}
        onChange={(e) => setType(e.target.value)}
        placeholder="Tipo de inversión"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Monto"
        required
      />
      <button type="submit">Añadir Inversión</button>
    </form>
  );
};

export default InvestmentForm;
