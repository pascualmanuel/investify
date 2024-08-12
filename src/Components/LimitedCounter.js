import React, { useState } from "react";

const LimitedCounter = ({ limit = 10 }) => {};
const [count, setCount] = useState(0);

const increment = () => {
  if (count < limit) setCount(count + 1);
  
  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={increment} disabled={count >= limit}>
        Increment
      </button>
    </div>
  );
};

export default LimitedCounter;
