import React, { useState } from "react";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(0);
  const exchangeRate = 0.85; // 1 USD = 0.85 EUR

  return (
    <div>
      <h2>Currency Converter</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="USD"
      />
      <p>
        {amount} USD = {(amount * exchangeRate).toFixed(2)} EUR
      </p>
    </div>
  );
};

export default CurrencyConverter;

