import React, { useState } from "react";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(0);
  const exchangeRate = 0.85; // 1 USD = 0.85 EUR

  return (
    <div>
      <h2>Currency Converter</h2>
    </div>
  );
};

export default CurrencyConverter;
