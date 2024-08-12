import React, { useState } from "react";

const LimitedCounter = ({ limit = 10 }) => {};
const [count, setCount] = useState(0);

const increment = () => {
  if (count < limit) setCount(count + 1);
};
export default LimitedCounter;
