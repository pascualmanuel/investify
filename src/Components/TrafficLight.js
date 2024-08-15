import React, { useState, useEffect } from "react";

const TrafficLight = () => {
  const [light, setLight] = useState("red");

  useEffect(() => {
    const interval = setInterval(() => {
      setLight((prevLight) =>
        prevLight === "red"
          ? "yellow"
          : prevLight === "yellow"
          ? "green"
          : "red"
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);
};

export default TrafficLight;
