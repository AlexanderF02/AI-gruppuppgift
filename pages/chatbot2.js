import { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message) return;

    setChatHistory((prev) => [...prev, { user: true, text: message }]);
    setLoading(true);

    try {
      // Call Gemini API
      const response = await axios.post(
        "https://ai.google.dev/competition/projects/gemini-chatbot",
        {
          input: message,
        },
        {
          headers: {
            Authorization: `Bearer AIzaSyBnEfLJvs7O4y20C95MuUKkuY3Jih9WXPg`,
          },
        }
      );

      const geminiResponse = response.data;

      setChatHistory((prev) => [
        ...prev,
        { user: false, text: geminiResponse.output },
      ]);
    } catch (error) {
      console.error("Error fetching response from Gemini API:", error);
      setChatHistory((prev) => [
        ...prev,
        { user: false, text: "Sorry, there was an error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }

    setMessage("");
  };

  return (
    <div className="chatbot-container">
      <h1>AI Chatbot</h1>
      <div className="chat-history">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`chat-message ${chat.user ? "user" : "gemini"}`}
          >
            <p>{chat.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="Ask me anything..."
          className="chat-input"
        />
        <button type="submit" disabled={loading} className="chat-submit-btn">
          {loading ? "Loading..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
