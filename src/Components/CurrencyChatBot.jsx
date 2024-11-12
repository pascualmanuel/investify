import React, { useState } from "react";

const Bot = () => {
  const [userInput, setUserInput] = useState("");
  const [botResponse, setBotResponse] = useState("");

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const queryWitAI = async (message) => {
    try {
      const response = await fetch(
        `https://api.wit.ai/message?v=20220101&q=${encodeURIComponent(
          message
        )}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_WITAI_SERVER_TOKEN}`,
          },
        }
      );

      // Verificamos si la respuesta fue exitosa
      if (!response.ok) {
        throw new Error("Error al consultar Wit.ai");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al consultar Wit.ai:", error);
      return {}; // Retornamos un objeto vacío en caso de error
    }
  };

  const fetchBTCPrice = async () => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    );
    const data = await response.json();
    return data.bitcoin.usd;
  };

  const fetchETHPrice = async () => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    );
    const data = await response.json();
    return data.ethereum.usd;
  };

  const fetchHistoricalPrice = async (date) => {
    const response = await fetch(
      `${process.env.REACT_APP_BLUELYTICS_API_URL}?day=${date}`
    );
    const data = await response.json();
    return data.blue.value_sell;
  };

  const fetchDolarBlueToday = async () => {
    const response = await fetch("https://api.bluelytics.com.ar/v2/latest");
    const data = await response.json();
    return data.blue.value_sell;
  };

  const handleBotResponse = async () => {
    try {
      const witResponse = await queryWitAI(userInput);
      const intent = witResponse?.intents?.[0]?.name; // Validar que 'intents' exista
      const entities = witResponse?.entities;

      let response = "Lo siento, no entendí eso.";

      if (intent === "precio_actual") {
        if (entities?.moneda?.[0]?.value === "BTC") {
          const price = await fetchBTCPrice();
          response = `El precio actual de BTC es ${price} USD.`;
        } else if (entities?.moneda?.[0]?.value === "ETH") {
          const price = await fetchETHPrice();
          response = `El precio actual de ETH es ${price} USD.`;
        }
      } else if (intent === "cotizacion_historica") {
        const moneda = entities?.moneda?.[0]?.value;
        const fecha = entities?.fecha?.[0]?.value;
        if (moneda && fecha) {
          const historicalPrice = await fetchHistoricalPrice(fecha);
          response = `El precio de ${moneda} el ${fecha} era de ${historicalPrice} ARS.`;
        }
      } else {
        response = "No pude entender tu consulta.";
      }

      setBotResponse(response);
    } catch (error) {
      console.error("Error en la respuesta del bot:", error);
      setBotResponse("Ocurrió un error al procesar tu solicitud.");
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Escribe tu pregunta"
        />
        <button onClick={handleBotResponse}>Enviar</button>
      </div>
      <div>
        <p>
          <strong>Respuesta del Bot:</strong> {botResponse}
        </p>
      </div>
    </div>
  );
};

export default Bot;
