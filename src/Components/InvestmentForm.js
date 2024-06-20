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

  return <form onSubmit={handleSubmit}></form>;
};

export default InvestmentForm;
