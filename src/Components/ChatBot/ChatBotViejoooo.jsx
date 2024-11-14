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
      // Make a request to Hugging Face API using the pipeline
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
        { text: response.data[0].generated_text, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error getting response from the model:", error);
      setMessages([
        ...newMessages,
        { text: "Sorry, I couldn't process your request!", sender: "bot" },
      ]);
    }

    setInput("");
  };

  return (
    <div>
      Chatbot
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
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
