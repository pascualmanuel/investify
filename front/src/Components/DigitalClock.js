import React, { useState, useEffect } from "react";

const DigitalClock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>{time}</h2>
    </div>
  );
};

export default DigitalClock;
