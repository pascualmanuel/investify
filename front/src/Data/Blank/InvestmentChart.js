// src/components/InvestmentChart.js
import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const InvestmentChart = ({ data }) => {
  return (
    <LineChart width={600} height={300} data={data}>
      <Line type="monotone" dataKey="amount" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      {/* <Legend /> */}
    </LineChart>
  );
};

export default InvestmentChart;
