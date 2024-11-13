import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);

    try {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
        { inputs: input },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_HUGGINGFACE_API_TOKEN}`,
          },
        }
      );

      setMessages([
        ...newMessages,
        { text: response.data.generated_text, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error al obtener la respuesta del modelo:", error);
      setMessages([
        ...newMessages,
        { text: "Lo siento, no pude procesar tu solicitud.!!", sender: "bot" },
      ]);
    }

    setInput("");
  };

  return (
    <div>
      <h1>Chatbot</h1>
      <div>
        {messages.map((msg, idx) => (
          <p
            key={idx}
            style={{ color: msg.sender === "user" ? "blue" : "green" }}
          >
            {msg.text}
          </p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Chatbot;
