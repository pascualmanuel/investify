import React, { useState } from "react";

const RandomQuoteGenerator = () => {
  const quotes = [
    "La vida es lo que pasa mientras haces otros planes.",
    "El que no arriesga no gana.",
    "Lo que no te mata, te hace más fuerte.",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
  ];

  const [quote, setQuote] = useState(quotes[0]);

  const generateQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  return (
    <div>
      <h3>{quote}</h3>
      <button onClick={generateQuote}>Mostrar nueva frase</button>
    </div>
  );
};

export default RandomQuoteGenerator;
