// src/components/InvestmentList.js
import React from "react";

const InvestmentList = ({ investments }) => {
  return (
    <ul>
      {investments.map((investment, index) => (
        <li key={index}>
          {/* {investment.crypto}: ${investment.amount.toFixed(2)} comprados el{" "} */}
          {/* {investment.date} a ${investment.price.toFixed(2)} cada uno hola */}
        </li>
      ))}
    </ul>
  );
};

export default InvestmentList;
