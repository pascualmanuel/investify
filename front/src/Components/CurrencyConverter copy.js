import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [dolar, setDolar] = useState([]);
  const [historicalRate, setHistoricalRate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

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
    let value = e.target.value.replace(/\./g, "");
    if (value === "") {
      setAmount("");
    } else if (!isNaN(value)) {
      value = parseInt(value).toString();
      setAmount(formatNumber(value));
    }
  };

  const calculateAmount = (value, rate) => {
    const numericValue = value ? parseInt(value.replace(/\./g, "")) : 0;
    if (numericValue === 0) return rate ? formatNumber(rate.toFixed(0)) : "0";
    return (numericValue * rate)
      .toFixed(0)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);

    if (date) {
      const formattedDate = date.toISOString().split("T")[0];

      // Fetch historical exchange rate for selected date
      fetch(`https://api.bluelytics.com.ar/v2/historical?day=${formattedDate}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.blue) {
            setHistoricalRate(data.blue);
          } else {
            setHistoricalRate(null);
          }
        });
    } else {
      setHistoricalRate(null); // Clear historical rate if date is cleared
    }
  };

  const currentDate = new Date().toDateString();

  return (
    <div>
      <h2>Currency Converter</h2>
      <input
        type="text"
        value={amount}
        onChange={handleChange}
        placeholder="USD"
      />
      <br />
      <br />
      {currentDate}

      <p>
        {amount || "1"} USD Compra = {calculateAmount(amount, exchangeRateBuy)}{" "}
        ARS
        <br />
        <br />
        {amount || "1"} USD Venta = {calculateAmount(amount, exchangeRateSell)}{" "}
        ARS
      </p>

      <h3>Select Date for Historical Rate</h3>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        maxDate={new Date()}
        placeholderText="Select a date"
      />

      {historicalRate && (
        <div>
          <h4>Exchange Rate on {selectedDate.toISOString().split("T")[0]}</h4>
          <p>
            Compra: {formatNumber(historicalRate.value_buy.toFixed(0))} ARS
            <br />
            Venta: {formatNumber(historicalRate.value_sell.toFixed(0))} ARS
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
