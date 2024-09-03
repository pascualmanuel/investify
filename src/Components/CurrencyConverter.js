import React, { useState, useEffect } from "react";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [dolar, setDolar] = useState([]);

  useEffect(() => {
    fetch("https://api.bluelytics.com.ar/v2/latest")
      .then((response) => response.json())
      .then((data) => setDolar(data));
  }, []);

  const exchangeRateSell = dolar?.blue?.value_sell;
  const exchangeRateBuy = dolar?.blue?.value_buy;

  const formatNumber = (num) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleChange = (e) => {
    let value = e.target.value.replace(/\./g, ""); // Remove existing dots
    if (value === "") {
      setAmount(""); // Clear the input
    } else if (!isNaN(value)) {
      value = parseInt(value).toString(); // Convert back to string without leading zeros
      setAmount(formatNumber(value));
    }
  };

  const calculateAmount = (value, rate) => {
    const numericValue = parseInt(value.replace(/\./g, ""));
    if (isNaN(numericValue)) return "";
    return numericValue
      ? (numericValue * rate).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      : "";
  };

  return (
    <div>
      <h2>Currency Converter</h2>
      <input
        type="text"
        value={amount}
        onChange={handleChange}
        placeholder="USD"
      />
      <p>
        {amount} USD Compra = {calculateAmount(amount, exchangeRateBuy)} ARS
        <br />
        <br />
        {amount} USD Venta = {calculateAmount(amount, exchangeRateSell)} ARS
      </p>
    </div>
  );
};

export default CurrencyConverter;
