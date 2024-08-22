import React from "react";
import { useState } from "react";
const DogAgeCalculator = () => {
  const [age, SetAge] = useState(0);

  //   const dogAge = 0;

  return (
    <>
      <h3>Calculadora de Edad en Perros</h3>

      <input
        type="number"
        value={age}
        onChange={(e) => SetAge(e.target.value)}
        placeholder="Age"
      />
      <p>
        {age} años humanos = {age * 7} años de perro
      </p>
    </>
  );
};

export default DogAgeCalculator;
