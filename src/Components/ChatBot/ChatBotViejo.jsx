// Chatbot.js
import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput("");

    // Generar respuesta
    const response = await getChatbotResponse(userInput);

    // Guardar la interacción
    await storeInteraction(userInput, response);

    // Actualizar mensajes
    setMessages([...newMessages, { sender: "bot", text: response }]);
  };

  const getChatbotResponse = async (input) => {
    const lowerInput = input.toLowerCase();

    // Verificar si está pidiendo cotización de criptomonedas (ejemplo: "precio bitcoin")
    if (
      lowerInput.includes("precio") &&
      (lowerInput.includes("bitcoin") || lowerInput.includes("btc"))
    ) {
      return await fetchCryptoPrice("bitcoin");
    }

    // Verificar si está pidiendo cotización del dólar
    if (
      lowerInput.includes("dólar") ||
      lowerInput.includes("usd") ||
      lowerInput.includes("dolar")
    ) {
      return await fetchDollarPrice();
    }

    // Respuesta por defecto para temas desconocidos
    return `Soy un chatbot especializado en cotizaciones de criptomonedas y del dólar. Pregúntame el precio del bitcoin o el dólar.`;
  };

  const fetchCryptoPrice = async (cryptoId) => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd`
      );
      const data = await res.json();
      return `El precio de ${
        cryptoId.charAt(0).toUpperCase() + cryptoId.slice(1)
      } es $${data[cryptoId].usd} USD.`;
    } catch (error) {
      return "Lo siento, no pude obtener el precio de la criptomoneda en este momento.";
    }
  };

  const fetchDollarPrice = async () => {
    try {
      const res = await fetch("https://api.bluelytics.com.ar/v2/latest");
      const data = await res.json();
      const oficial = data.oficial;
      const blue = data.blue;
      return `Cotización del dólar:\n- Oficial: Compra $${oficial.value_buy} / Venta $${oficial.value_sell}\n- Blue: Compra $${blue.value_buy} / Venta $${blue.value_sell}`;
    } catch (error) {
      return "Lo siento, no pude obtener la cotización del dólar en este momento.";
    }
  };

  const storeInteraction = async (userQuery, botResponse) => {
    const apiKey = "tu_api_key_aqui"; // Reemplaza con tu API key de MagicLoops
    await fetch("https://api.magicloops.com/store", {
      method: "POST",
      body: JSON.stringify({ userQuery, botResponse }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`, // Autenticación con el token
      },
    });
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        onKeyPress={(e) => (e.key === "Enter" ? sendMessage() : null)}
        placeholder="Escribe algo...!1"
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
};

export default Chatbot;
