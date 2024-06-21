import React from "react";

const InvestmentList = ({ investments }) => {
  return (
    <>
      <ul>
        {investmewnts.map((investmeent, index) => (
          <li key={index}>
            {investmenet.type}: ${investmenet.amount.toFixed(2)}
          </li>
        ))}
      </ul>
    </>
  );
};

export default InvestmentList;
