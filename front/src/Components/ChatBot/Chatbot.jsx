import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true); // Estado para identificar el primer mensaje

  const accessToken = process.env.REACT_APP_WITAI_SERVER_TOKEN;
  const greetResponses = [
    "Hola! En qué puedo ayudarte hoy? 😊",
    "Buenas! Te ayudo con alguna cotización de criptos? 💰",
    "Hey! Buscas el precio de tu crypto favorita",
    "Hola! Decime en qué puedo ayudarte. 😄",
    "Hola! Pregunta por cualquier moneda y te digo su valor actual. 🚀",
  ];

  const farewellResponses = [
    "Hasta luego! Que tengas un buen día. 👋",
    "Chau! Si necesitas más ayuda, aquí estaré. 😊",
    "Nos vemos! No dudes en volver si tienes más preguntas. 🚀",
    "Adiós, cuídate mucho! 😄",
    "Chau chau, hasta la próxima! 👋",
  ];

  const fetchCryptoPrice = async (cryptoSymbol) => {
    try {
      const response = await axios.get(
        `https://min-api.cryptocompare.com/data/price?fsym=${cryptoSymbol}&tsyms=USD`
      );
      return response.data.USD;
    } catch (error) {
      console.error("Error al obtener el precio de la criptomoneda:", error);
      return null;
    }
  };

  const fetchDollarPrice = async (type) => {
    try {
      const response = await axios.get(
        "https://api.bluelytics.com.ar/v2/latest"
      );
      if (type === "blue") {
        return {
          buy: response.data.blue.value_buy,
          sell: response.data.blue.value_sell,
        };
      } else {
        return {
          buy: response.data.oficial.value_buy,
          sell: response.data.oficial.value_sell,
        };
      }
    } catch (error) {
      console.error("Error al obtener el precio del dólar:", error);
      return null;
    }
  };

  const fetchHistoricalCryptoPrice = async (cryptoSymbol, timestamp) => {
    try {
      const response = await axios.get(
        `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${cryptoSymbol.toUpperCase()}&tsyms=USD&ts=${timestamp}`
      );
      return response.data[cryptoSymbol.toUpperCase()]?.USD || null;
    } catch (error) {
      console.error(
        "Error al obtener el precio histórico de la criptomoneda:",
        error
      );
      return null;
    }
  };

  // const fetchHistoricalDollarPrice = async (date) => {
  //   console.log("fetchHistoricalDollarPrice", date);
  //   try {
  //     const response = await axios.get(
  //       `https://api.bluelytics.com.ar/v2/historical?day=${date}`
  //     );
  //     if (response.data.length > 0) {
  //       console.log(response);
  //       return {
  //         buy: response.data[0].value_buy,
  //         sell: response.data[0].value_sell,
  //       };
  //     } else {
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("Error al obtener el precio histórico del dólar:", error);
  //     return null;
  //   }
  // };

  const fetchHistoricalDollarPrice = async (date) => {
    console.log("fetchHistoricalDollarPrice", date);
    try {
      const response = await axios.get(
        `https://api.bluelytics.com.ar/v2/historical?day=${date}`
      );

      if (response.data) {
        // Comprobamos si existen los valores de "oficial" o "blue" y devolvemos los precios de compra y venta.
        const official = response.data.oficial;
        const blue = response.data.blue;

        // Aquí podemos decidir cuál mostrar o ambos.
        return {
          oficial_buy: official.value_buy,
          oficial_sell: official.value_sell,
          blue_buy: blue.value_buy,
          blue_sell: blue.value_sell,
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error al obtener el precio histórico del dólar:", error);
      return null;
    }
  };

  const handleSend = async () => {
    if (inputText.trim() === "") return;

    setMessages((prev) => [...prev, { sender: "user", text: inputText }]);
    setInputText("");
    setIsThinking(true);

    try {
      const url = `https://api.wit.ai/message?v=20240922&q=${encodeURIComponent(
        inputText
      )}`;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      const result = await axios.get(url, { headers });
      const data = result.data;

      console.log("Respuesta de Wit.ai:", data);

      const intent = data.intents[0]?.name;
      const cryptoEntity = data.entities["crypto:crypto"]?.[0]?.value;

      console.log(cryptoEntity);

      let botResponse =
        "mmm, no estoy seguro de lo que me preguntas. Podrías intentarlo de nuevo?";

      if (intent === "greet") {
        botResponse =
          greetResponses[Math.floor(Math.random() * greetResponses.length)];
      } else if (intent === "farewell") {
        botResponse =
          farewellResponses[
            Math.floor(Math.random() * farewellResponses.length)
          ];
      } else if (intent === "current_price" && cryptoEntity) {
        if (cryptoEntity.toUpperCase() === "USD") {
          // Si es USD, pregunta por el tipo de dólar
          botResponse = (
            <>
              Deseas el valor del dólar{" "}
              <span
                onClick={() => handleDollarChoice("oficial")}
                style={{
                  color: "blue",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                oficial
              </span>{" "}
              o el{" "}
              <span
                onClick={() => handleDollarChoice("blue")}
                style={{
                  color: "blue",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                dólar blue
              </span>
              ?
            </>
          );
          setMessages((prev) => [
            ...prev,
            { sender: "bot", text: botResponse },
          ]);
          setIsThinking(false);
          return;
        } else {
          const price = await fetchCryptoPrice(cryptoEntity);
          if (price) {
            // Agregar lógica para el primer mensaje con cotización
            if (isFirstMessage) {
              botResponse = `El precio actual de ${cryptoEntity} es de $${price} USD. Te gustaría saber el precio de alguna otra moneda?`;
              setIsFirstMessage(false); // Marcar que ya se respondió el primer mensaje
            } else {
              botResponse = `El precio actual de ${cryptoEntity} es de $${price} USD.`;
            }
          } else {
            botResponse =
              "Lo siento, no pude obtener el precio en este momento. Intenta más tarde.";
          }
        }
      } else if (intent === "historical_price") {
        const dateEntity = data.entities["wit$datetime:datetime"]?.[0]?.value;
        const cryptoEntity =
          data.entities["crypto:crypto"]?.[0]?.value?.toLowerCase(); // Normalizamos el valor a minúsculas.

        if (!dateEntity) {
          botResponse =
            "No pude entender la fecha que mencionaste. Intenta de nuevo con una fecha válida.";
        } else {
          const formattedDate = new Date(dateEntity)
            .toISOString()
            .split("T")[0];
          const timestamp = Math.floor(new Date(dateEntity).getTime() / 1000);

          if (cryptoEntity === "usd" || cryptoEntity === "USD") {
            console.log("cryptoEntity dólar");
            // Caso específico para "dólar".
            const price = await fetchHistoricalDollarPrice(formattedDate);
            console.log(price);
            botResponse = price
              ? `El precio del dólar el día ${formattedDate} fue de $${price.blue_buy} para la compra y $${price.blue_sell} para la venta. Con respecto al dolar oficial fue de $${price.oficial_buy} para la compra y $${price.oficial_sell} para la venta.`
              : "Lo siento, no pude obtener el precio histórico del dólar en este momento.";
          } else if (cryptoEntity != "USD") {
            // Caso para criptomonedas.
            console.log("cryptoEntity crypto");

            const price = await fetchHistoricalCryptoPrice(
              cryptoEntity,
              timestamp
            );
            botResponse = price
              ? `El precio de ${cryptoEntity} el día ${formattedDate} fue de $${price} USD.`
              : "Lo siento, no pude obtener el precio histórico en este momento.";
          } else {
            botResponse =
              "No reconocí la moneda o criptomoneda que mencionaste. Por favor, intenta de nuevo.";
          }
        }
      }

      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
        setIsThinking(false);
      }, 1500);
    } catch (error) {
      console.error("Error al llamar a la API de Wit.ai:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Hubo un error al procesar tu solicitud." },
      ]);
      setIsThinking(false);
    }
  };

  const handleDollarChoice = async (choice) => {
    const prices = await fetchDollarPrice(choice);
    let botResponse = "";
    if (prices) {
      botResponse = `El valor del dólar ${
        choice === "blue" ? "blue" : "oficial"
      } es de $${prices.buy} para la compra y $${prices.sell} para la venta.`;
    } else {
      botResponse =
        "Hubo un error al obtener el valor del dólar. Intenta más tarde.";
    }
    setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <h2>Crypto hoy</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.sender === "user" ? "user-message" : "bot-message"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {isThinking && <div className="thinking">Pensando...</div>}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Escribe aquí... Ej: A cuánto está el BTC?"
          className="input"
        />
        <button onClick={handleSend} className="send-button">
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
