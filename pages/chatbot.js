"use client";

import { useState } from "react";
import { model } from "@/utils/ai";

export default function AIChatbot() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showChat, setShowChat] = useState(false);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    setLoading(true);
    setError(null);
    setShowChat(true);

    try {
      const aiResponse = await model.generateContent(message);

      if (!aiResponse || !aiResponse.response || !aiResponse.response.text) {
        throw new Error("No valid response from AI model");
      }

      setResponse(aiResponse.response.text);
    } catch (error) {
      console.error("Error sending message:", error);
      setError(`Error: ${error.message}`);
      setResponse("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-2">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">
        Chat with <span className="text-[oklch(var(--p))]">Lady Chat</span>
      </h1>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg sm:max-w-xl p-8 rounded-lg shadow-md gap-2"
      >
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Type your message..."
          disabled={loading}
          className={`input input-bordered input-primary w-full rounded-full mb-4 text-black bg-white dark:bg-transparent dark:text-white ${message.trim() ? 'border-blue-500' : 'border-gray-500'} ${loading ? 'bg-gray-200' : ''}`}
        />

        <button
          type="submit"
          disabled={loading}
          className={`btn w-full rounded-full ${loading ? 'btn-disabled' : 'btn-accent'}`}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>

      {showChat && (
        <div className="w-full max-w-lg sm:max-w-xl p-8 gap-2 mt-4 bg-transparent">
          <div className="chat chat-start">
            <div className="chat-bubble">
              {message && message}
            </div>
          </div>

          {response && !loading && (
            <div className="chat chat-end">
              <div className="chat-bubble">{response}</div>
            </div>
          )}

          {loading && <p className="text-white mt-4 text-center">Loading...</p>}
        </div>
      )}
    </div>
  );
}

