import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true); // Nuevo estado para identificar el primer mensaje

  const accessToken = process.env.REACT_APP_WITAI_SERVER_TOKEN;

  const greetResponses = [
    "Hola! ¿En qué puedo ayudarte hoy? 😊",
    "Buenas! ¿Te ayudo con alguna cotización de criptos? 💰",
    "Hey! Buscas el precio de tu crypto favorita",
    "Hola! Pregunta por cualquier moneda y te digo su valor actual. 🚀",
    "Hola! Decime en qué puedo ayudarte. 😄",
  ];

  const firstMsgWithCotization = [
    "Buenas! El precio de {crypto} es ${price} USD. Si necesitas algo más, no dudes en avisarme!",
    "Hola, gracias por usar chatbot! El precio de {crypto} es ${price} USD. ¿Algo más en lo que pueda ayudarte?",
    "Hola! El precio actual de {crypto} es ${price} USD. Estoy aquí para cualquier otra duda. 😊",
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
        const price = await fetchCryptoPrice(cryptoEntity);
        if (price) {
          if (isFirstMessage) {
            botResponse = firstMsgWithCotization[
              Math.floor(Math.random() * firstMsgWithCotization.length)
            ]
              .replace("{crypto}", cryptoEntity)
              .replace("{price}", price);
            setIsFirstMessage(false);
          } else {
            botResponse = `El precio actual de ${cryptoEntity} es de $${price} USD.`;
          }
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
