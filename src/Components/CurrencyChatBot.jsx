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
            Authorization: `Bearer 3KW3TSEYBFXAFTDNVW4KF24QNKNHUSVB`,
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
      // Llamada a la API de CoinGecko para obtener el precio actual de BTC o ETH
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
      );
      const data = await response.json();
      const btcPrice = data.bitcoin.usd;
      const ethPrice = data.ethereum.usd;
      setResponse(
        `El precio actual de Bitcoin es $${btcPrice} USD y Ethereum es $${ethPrice} USD.`
      );
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
      // Llamada a la API de Bluelytics para obtener el precio histórico del Dólar Blue
      if (userInput.toLowerCase().includes("dolar blue")) {
        const response = await fetch(
          `https://api.bluelytics.com.ar/v2/historical?day=${date}`
        );
        const data = await response.json();
        setResponse(
          `El precio del Dólar Blue el ${date} era $${data.blue.value_sell} ARS.`
        );
      } else {
        // Llamada a la API de CoinGecko para obtener el precio histórico de BTC o ETH
        const coin = userInput.toLowerCase().includes("btc")
          ? "bitcoin"
          : "ethereum";
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coin}/history?date=${date}&localization=false`
        );
        const data = await response.json();
        const price =
          coin === "bitcoin"
            ? data.market_data.current_price.usd
            : data.market_data.current_price.usd;
        setResponse(
          `El precio de ${coin.toUpperCase()} el ${date} era $${price} USD.`
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
    return match ? match[0].replace(/\/|-/g, "") : null;
  };

  const extractInvestmentData = (input) => {
    // Regex para extraer monto y fecha
    const match = input.match(
      /(\d+)\s*(usd|dolares)\s*(el\s*\d{1,2}[\-\/]\d{1,2}[\-\/]\d{4})/i
    );
    if (match) {
      return [match[1], match[3].replace(/[\-\/]/g, "")];
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
      <div>Respuesta del bot: {response}</div>
    </div>
  );
};

export default CurrencyChatBot;
