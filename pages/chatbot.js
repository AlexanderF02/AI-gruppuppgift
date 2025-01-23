"use client";

import { useState, useEffect } from "react";
import axios from "axios";
require("dotenv").config();

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      const { data } = await axios.post(
        "/pages/",
        { message },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      setResponse(aiResponse.response.text); 
    } catch (error) {
      console.error("Error sending message:", error);
      if (error.response) {
        setError(`Server responded with status code ${error.response.status}`);
      } else if (error.request) {
        setError("No response received from the server");
      } else {
        setError("Error setting up the request");
      }
      setResponse("");
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="chatbot-container">
      <h1>Chat with AI</h1>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Type your message..."
          disabled={loading}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button type="submit" disabled={loading} className="send-button">
          {loading ? "Sending..." : "Send"}
        </button>
      </form>

      {loading && <p className="loading-message">Loading...</p>}

      {response && !loading && (
        <div className="w-full max-w-md bg-white p-4 rounded shadow-md mt-4">
          <h3 className="text-lg font-bold mb-2">AI's Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
