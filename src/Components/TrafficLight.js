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
          borderRadius: "50px",
          marginTop: "5px",
          backgroundColor: light === "red" ? "red" : "gray",
        }}
      ></div>
      <div
        style={{
          width: 50,
          height: 50,
          borderRadius: "50px",
          marginTop: "5px",
          backgroundColor: light === "yellow" ? "yellow" : "gray",
        }}
      ></div>
      <div
        style={{
          width: 50,
          height: 50,
          borderRadius: "50px",
          marginTop: "5px",
          backgroundColor: light === "green" ? "green" : "gray",
        }}
      ></div>
    </div>
  );
};

export default TrafficLight;
