import React, { useState } from "react";
import axios from "axios";

const CryptoBot = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const accessToken = process.env.REACT_APP_WITAI_SERVER_TOKEN; // Reemplaza con tu token de Wit.ai

  const greetResponses = [
    "¡Hola! ¿En qué puedo ayudarte hoy? 😊",
    "¡Buenas! ¿Te ayudo con alguna cotización de criptos? 💰",
    "¡Hey! ¿Buscas el precio de alguna criptomoneda?",
    "¡Hola! Pregunta por cualquier moneda y te digo su valor actual. 🚀",
    "¡Saludos! Dime en qué puedo ayudarte. 😄",
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
        "Hmm, no estoy seguro de lo que me preguntas. ¿Podrías intentarlo de nuevo?";

      if (intent === "greet") {
        // Escoge un saludo aleatorio del array greetResponses
        botResponse =
          greetResponses[Math.floor(Math.random() * greetResponses.length)];
      } else if (intent === "current_price" && cryptoEntity) {
        const price = await fetchCryptoPrice(cryptoEntity);
        if (price) {
          botResponse = `El precio actual de ${cryptoEntity} es de $${price} USD. 📈`;
        } else {
          botResponse =
            "Lo siento, no pude obtener el precio en este momento. Intenta más tarde.";
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

  return (
    <div className="chat-container">
      <h2>Consulta de Criptomonedas 💬</h2>
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
          placeholder="Escribe aquí... Ej: ¿A cuánto está el BTC?"
          className="input"
        />
        <button onClick={handleSend} className="send-button">
          Enviar
        </button>
      </div>
    </div>
  );
};

export default CryptoBot;
