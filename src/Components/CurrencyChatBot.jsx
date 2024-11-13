import React, { useState } from "react";

const CurrencyChatBot = () => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  // Llamar a Wit.ai para procesar la intención
  const handleSendMessage = async () => {
    if (!userInput) return;

    try {
      const query = encodeURIComponent(userInput); // Codificamos la consulta
      const response = await fetch(
        `https://api.wit.ai/message?v=20241112&q=${query}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer  ${process.env.REACT_APP_WITAI_SERVER_TOKEN}`,
          },
        }
      );

      const data = await response.json();
      console.log(data); // Para ver el resultado de Wit.ai

      // Verificamos la intención y llamamos a las funciones correspondientes
      if (data && data.intents && data.intents.length > 0) {
        const intent = data.intents[0].name;
        switch (intent) {
          case "current_price":
            await getCurrentPrice();
            break;
          case "historical_price":
            await getHistoricalPrice();
            break;
          case "value_comp":
            await getValueComparison();
            break;
          default:
            setResponse("No pude entender tu mensaje.");
        }
      } else {
        setResponse("No pude entender tu mensaje.");
      }
    } catch (error) {
      console.error("Error al consultar Wit.ai:", error);
      setResponse("Hubo un error al procesar tu solicitud.");
    }
  };

  // Obtener el precio actual (Dólar, BTC, ETH)
  const getCurrentPrice = async () => {
    try {
      if (userInput.toLowerCase().includes("dolar blue")) {
        // Obtener el precio del Dólar Blue
        const response = await fetch("https://api.bluelytics.com.ar/v2/latest");
        const data = await response.json();
        setResponse(
          `El precio actual del Dólar Blue es $${data.blue.value_sell} ARS.`
        );
      } else if (userInput.toLowerCase().includes("btc")) {
        // Llamada a la API de CoinGecko para obtener el precio de BTC
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
        );
        const data = await response.json();
        const btcPrice = data.bitcoin.usd;
        setResponse(`El precio actual de Bitcoin es $${btcPrice} USD.`);
      } else if (userInput.toLowerCase().includes("eth")) {
        // Llamada a la API de CoinGecko para obtener el precio de ETH
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        );
        const data = await response.json();
        const ethPrice = data.ethereum.usd;
        setResponse(`El precio actual de Ethereum es $${ethPrice} USD.`);
      } else {
        // Si no se especifica ninguna criptomoneda, devolver un mensaje genérico
        setResponse(
          "Por favor, especifica una criptomoneda válida (BTC o ETH)."
        );
      }
    } catch (error) {
      console.error("Error al obtener el precio actual:", error);
      setResponse("Hubo un error al obtener el precio actual.");
    }
  };

  // Obtener el precio histórico (para BTC, ETH o Dólar Blue)
  const getHistoricalPrice = async () => {
    const date = extractDate(userInput); // Extraemos la fecha mencionada por el usuario
    if (!date) {
      setResponse("Por favor, proporciona una fecha válida.");
      return;
    }

    try {
      if (userInput.toLowerCase().includes("dolar blue")) {
        // Formatear la fecha como "yyyy-mm-dd" para Bluelytics
        const formattedDate = formatDate(date);
        const response = await fetch(
          `https://api.bluelytics.com.ar/v2/historical?day=${formattedDate}`
        );
        const data = await response.json();
        setResponse(
          `El precio del Dólar Blue el ${formattedDate} era $${data.blue.value_sell} ARS.`
        );
      } else {
        // Llamada a la API de CoinGecko para obtener el precio histórico de BTC o ETH
        const coin = userInput.toLowerCase().includes("btc")
          ? "bitcoin"
          : "ethereum";
        const formattedDate = formatDate(date);
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coin}/history?date=${formattedDate}&localization=false`
        );
        const data = await response.json();
        const price =
          coin === "bitcoin"
            ? data.market_data.current_price.usd
            : data.market_data.current_price.usd;
        setResponse(
          `El precio de ${coin.toUpperCase()} el ${formattedDate} era $${price} USD.`
        );
      }
    } catch (error) {
      console.error("Error al obtener el precio histórico:", error);
      setResponse("Hubo un error al obtener el precio histórico.");
    }
  };

  // Calcular el valor actual de una inversión (BTC, ETH, Dólar Blue)
  const getValueComparison = async () => {
    const [amount, date] = extractInvestmentData(userInput); // Extraemos los datos de la inversión
    if (!amount || !date) {
      setResponse(
        "Por favor, proporciona los datos de inversión correctamente."
      );
      return;
    }

    try {
      // Llamada a la API de CoinGecko para obtener el precio actual de BTC o ETH
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
      );
      const data = await response.json();
      const btcPrice = data.bitcoin.usd;
      const ethPrice = data.ethereum.usd;

      // Lógica para calcular el valor actual de la inversión
      let value = 0;
      if (userInput.toLowerCase().includes("btc")) {
        value = (amount / btcPrice) * btcPrice;
      } else if (userInput.toLowerCase().includes("eth")) {
        value = (amount / ethPrice) * ethPrice;
      }
      setResponse(
        `Si hubieras invertido $${amount} en ${
          userInput.toLowerCase().includes("btc") ? "BTC" : "ETH"
        } el ${date}, hoy tendrías aproximadamente $${value} USD.`
      );
    } catch (error) {
      console.error("Error al calcular el valor de la inversión:", error);
      setResponse("Hubo un error al calcular el valor de la inversión.");
    }
  };

  // Funciones auxiliares para extraer fecha y datos de inversión
  const extractDate = (input) => {
    // Regex para extraer la fecha en formato dd/mm/yyyy o dd-mm-yyyy
    const match = input.match(/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}/);
    return match ? match[0] : null;
  };

  const formatDate = (date) => {
    // Convertir la fecha al formato yyyy-mm-dd
    const parts = date.split(/[\/\-]/);
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  const extractInvestmentData = (input) => {
    // Regex para extraer monto y fecha
    const match = input.match(
      /(\d+)\s*(usd|dolares)\s*(el\s*\d{1,2}[\-\/]\d{1,2}[\-\/]\d{4})/i
    );
    if (match) {
      return [match[1], match[3].trim()];
    }
    return [null, null];
  };

  return (
    <div>
      <input
        type="text"
        value={userInput}
        onChange={handleUserInput}
        placeholder="Escribe tu consulta"
      />
      <button onClick={handleSendMessage}>Enviar</button>
      <p>{response}</p>
    </div>
  );
};

export default CurrencyChatBot;
