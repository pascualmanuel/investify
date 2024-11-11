import React, { useState, useEffect } from "react";

const CurrencyChatBot = () => {
  const [userMessage, setUserMessage] = useState("");
  const [botResponse, setBotResponse] = useState("");
  const [context, setContext] = useState(null); // New context state to handle conversation
  const [exchangeRates, setExchangeRates] = useState({
    BTC: null,
    ETH: null,
    USD: null,
  });

  useEffect(() => {
    // Fetch prices for BTC and ETH from CoinGecko
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
    )
      .then((response) => response.json())
      .then((data) => {
        setExchangeRates({
          BTC: data.bitcoin.usd,
          ETH: data.ethereum.usd,
          USD: null, // USD handled separately
        });
      })
      .catch((error) =>
        console.error("Error fetching cryptocurrency data:", error)
      );
  }, []);

  const handleUserMessage = (message) => {
    setUserMessage(message);

    // Check if the message is asking for a cryptocurrency price
    if (
      message.toLowerCase().includes("btc") ||
      message.toLowerCase().includes("bitcoin")
    ) {
      setBotResponse(`El precio actual de 1 BTC es ${exchangeRates.BTC} USD.`);
      setContext(null); // Reset context
    } else if (
      message.toLowerCase().includes("eth") ||
      message.toLowerCase().includes("ethereum")
    ) {
      setBotResponse(`El precio actual de 1 ETH es ${exchangeRates.ETH} USD.`);
      setContext(null); // Reset context
    } else if (
      message.toLowerCase().includes("dolar") ||
      message.toLowerCase().includes("dólar")
    ) {
      // Set the context to handle dollar-specific questions
      setBotResponse(
        "¿Qué tipo de dólar necesitas? Blue compra, Blue venta, Oficial compra, Oficial venta."
      );
      setContext("dolarQuery");
    } else if (context === "dolarQuery") {
      // Handle the user's response to the dollar type question
      if (message.toLowerCase().includes("blue compra")) {
        fetchDolar("blueCompra");
      } else if (message.toLowerCase().includes("blue venta")) {
        fetchDolar("blueVenta");
      } else if (message.toLowerCase().includes("oficial compra")) {
        fetchDolar("oficialCompra");
      } else if (message.toLowerCase().includes("oficial venta")) {
        fetchDolar("oficialVenta");
      } else {
        setBotResponse(
          "Lo siento, no entendí. ¿Podrías repetir el tipo de dólar?"
        );
      }
    } else {
      setBotResponse("Lo siento, no entendí eso.");
    }
  };

  const fetchDolar = (type) => {
    // Fetch USD rate from Bluelytics for the selected type (buy/sell)
    fetch("https://api.bluelytics.com.ar/v2/latest")
      .then((response) => response.json())
      .then((data) => {
        let rate = null;
        switch (type) {
          case "blueCompra":
            rate = data.blue.value_buy;
            break;
          case "blueVenta":
            rate = data.blue.value_sell;
            break;
          case "oficialCompra":
            rate = data.oficial.value_buy;
            break;
          case "oficialVenta":
            rate = data.oficial.value_sell;
            break;
          default:
            rate = null;
        }
        setBotResponse(
          `El precio del dólar ${type
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()} es ${rate} ARS.`
        );
        setContext(null); // Reset context after answering
      })
      .catch((error) => console.error("Error fetching USD data:", error));
  };

  return (
    <div className="chat-container">
      <br />
      <br />
      <br />
      <div className="chat-box">
        <div className="messages">
          <div className="user-message">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleUserMessage(userMessage);
                }
              }}
              placeholder="Escribe tu pregunta..."
            />
          </div>

          <div className="bot-response">
            <p>{botResponse}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyChatBot;
