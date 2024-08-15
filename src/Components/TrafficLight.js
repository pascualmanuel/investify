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

  return (
    <div>
      <div
        style={{
          width: 50,
          height: 50,
          backgroundColor: light === "red" ? "red" : "gray",
        }}
      ></div>
    </div>
  );
};

export default TrafficLight;
