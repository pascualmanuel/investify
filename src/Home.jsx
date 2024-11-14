import React from "react";
import "./Styles/App.css";
import ChatBot from "./Components/ChatBot/Chatbot";

const Home = () => {
  return (
    <>
      <div className="App">
        <ChatBot />
      </div>
    </>
  );
};

export default Home;
