import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true); // Estado para identificar el primer mensaje

  const accessToken = process.env.REACT_APP_WITAI_SERVER_TOKEN;
  const greetResponses = [
    "Hola! ¿En qué puedo ayudarte hoy? 😊",
    "Buenas! ¿Te ayudo con alguna cotización de criptos? 💰",
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
              ¿Deseas el valor del dólar{" "}
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
              botResponse = `El precio actual de ${cryptoEntity} es de $${price} USD. ¿Te gustaría saber el precio de alguna otra moneda?`;
              setIsFirstMessage(false); // Marcar que ya se respondió el primer mensaje
            } else {
              botResponse = `El precio actual de ${cryptoEntity} es de $${price} USD.`;
            }
          } else {
            botResponse =
              "Lo siento, no pude obtener el precio en este momento. Intenta más tarde.";
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

      {/* Mensaje con los enlaces clickeables */}
      {/* {messages.some((msg) => msg.text.includes("dólar")) && !isThinking && (
        <div className="dollar-options">
          <span
            onClick={() => handleDollarChoice("blue")}
            style={{ color: "blue", cursor: "pointer", marginRight: "10px" }}
          >
            Dólar Blue
          </span>
          <span
            onClick={() => handleDollarChoice("oficial")}
            style={{ color: "green", cursor: "pointer" }}
          >
            Dólar Oficial
          </span>
        </div>
      )} */}
    </div>
  );
};

export default Chatbot;
