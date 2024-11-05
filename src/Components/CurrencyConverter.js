import React, { useState, useEffect } from "react";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [dolar, setDolar] = useState([]);

  useEffect(() => {
    fetch("https://api.bluelytics.com.ar/v2/latest")
      .then((response) => response.json())
      .then((data) => setDolar(data));
  }, []);

  const exchangeRateSell = dolar?.blue?.value_sell; // USD to ARS exchange rate (Venta)
  const exchangeRateBuy = dolar?.blue?.value_buy; // USD to ARS exchange rate (Compra)

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
    const numericValue = value ? parseInt(value.replace(/\./g, "")) : 0;

    // If the amount is 0 or empty, show the exchange rate value for 1 USD, formatted with dot separators
    if (numericValue === 0) return rate ? formatNumber(rate.toFixed(0)) : "0";

    // Otherwise, calculate the conversion for the given amount
    return (numericValue * rate)
      .toFixed(0)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
      <p className="">
        {amount || ""} USD Compra = {calculateAmount(amount, exchangeRateBuy)}{" "}
        ARS
        <br />
        <br />
        {amount || ""} USD Venta = {calculateAmount(amount, exchangeRateSell)}{" "}
        ARS
      </p>
    </div>
  );
};

export default CurrencyConverter;
