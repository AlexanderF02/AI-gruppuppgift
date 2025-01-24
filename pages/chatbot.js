'use client';

import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai'; 

export default function AIChatbot() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
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
      const aiResponse = await model.generateContent(message);  

      if (!aiResponse || !aiResponse.response || !aiResponse.response.text) {
        throw new Error('No valid response from AI model');
      }

      setResponse(aiResponse.response.text); 
    } catch (error) {
      console.error('Error sending message:', error);
      setError(`Error: ${error.message}`);
      setResponse(''); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center text-white">
        Chat with <span className="text-purple-700">Lady AI</span>
      </h1>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="w-full max-w-lg sm:max-w-xl p-4 rounded-lg shadow-md">
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Type your message..."
          disabled={loading}
          className="w-full p-3 sm:p-4 text-sm sm:text-base border border-gray-300 rounded mb-4 text-black bg-white dark:bg-transparent dark:text-white"
        />
        <button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-purple-800 text-white p-3 sm:p-4 rounded-lg text-sm sm:text-base hover:bg-purple-700"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>

      {loading && <p className="text-purple-700 mt-4 text-center">Loading...</p>}

      {response && !loading && (
        <div className="w-full max-w-lg sm:max-w-xl p-4 rounded-lg shadow-md mt-4">
          <h3 className="text-lg sm:text-xl font-bold mb-2">AI's Response:</h3>
          <p className="text-sm sm:text-base">{response}</p>
        </div>
      )}
    </div>
  );
}