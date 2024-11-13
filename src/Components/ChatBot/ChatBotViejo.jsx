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
    <div style={styles.chatContainer}>
      <h2>Consulta de Criptomonedas 💬</h2>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              ...(msg.sender === "user"
                ? styles.userMessage
                : styles.botMessage),
            }}
          >
            {msg.text}
          </div>
        ))}
        {isThinking && <div style={styles.thinking}>Pensando...</div>}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Escribe aquí... Ej: ¿A cuánto está el BTC?"
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.sendButton}>
          Enviar
        </button>
      </div>
    </div>
  );
};

// Estilos para el chat
const styles = {
  chatContainer: {
    textAlign: "center",
    marginTop: "20px",
    fontFamily: "Arial, sans-serif",
  },
  chatBox: {
    width: "80%",
    maxHeight: "400px",
    margin: "0 auto",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflowY: "auto",
    backgroundColor: "#f9f9f9",
  },
  message: {
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
    maxWidth: "75%",
  },
  userMessage: {
    backgroundColor: "#d1f0ff",
    marginLeft: "auto",
    textAlign: "right",
  },
  botMessage: {
    backgroundColor: "#e1e1e1",
    textAlign: "left",
  },
  thinking: {
    fontStyle: "italic",
    color: "#888",
    textAlign: "left",
    marginBottom: "10px",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  },
  input: {
    padding: "10px",
    width: "70%",
    borderRadius: "8px 0 0 8px",
    border: "1px solid #ddd",
    outline: "none",
  },
  sendButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "0 8px 8px 0",
    cursor: "pointer",
  },
};

export default CryptoBot;
