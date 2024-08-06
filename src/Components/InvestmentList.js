import React from "react";

const InvestmentList = ({ investments }) => {
  return (
    <ul>
      {investments.map((investment, index) => (
        <li key={index}>
          {investment.type}: ${investment.amount.toFixed(2)}
        </li>
      ))}
    </ul>
  );
};

export default InvestmentList;
