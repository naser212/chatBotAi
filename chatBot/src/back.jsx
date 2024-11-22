import { useState } from 'react';
import send1 from './button.svg';

const ChatInterface = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [visible, setVisible] = useState(true);

  const suggestions = [
    "What courses are required for my major?",
    "Can I change my major or minor?",
    "How do I check my degree progress?",
    "What electives can I take for my degree?",
    "Where can I find information about course descriptions?"
  ];

  // API handler to send a message to the server and receive a response
  const sendMessageToServer = async (message) => {
    try {
      const response = await fetch("https://your-server-endpoint.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch server response");
      }

      const data = await response.json();
      return data.response; // Assuming server returns { response: "Server reply" }
    } catch (error) {
      console.error("Error communicating with the server:", error);
      return "Oops! Something went wrong.";
    }
  };

  // Handle sending a message
  const handleSend = async () => {
    if (input.trim()) {
      // Add the user message
      setMessages((prev) => [...prev, { text: input, isServer: false }]);
      setInput("");

      // Send the message to the server
      const serverResponse = await sendMessageToServer(input);

      // Add the server's response
      setMessages((prev) => [...prev, { text: serverResponse, isServer: true }]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSend();
    setVisible(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 p-4">
      <form
        className="bg-gray-200 w-full max-w-6xl p-6 rounded-lg shadow-lg px-8"
        onSubmit={handleSubmit}
      >
        {/* Header */}
        <div className="text-center text-gray-600 mb-6">
          <h1 className="text-lg font-semibold">
            Hi! I'm here to help you. Select a topic below or type your question!
          </h1>
        </div>

        {/* Suggestions */}
        <div
          className={`flex flex-wrap items-center gap-4 ${
            !visible ? "hidden" : ""
          } justify-items-center object-center p-10 mb-44`}
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="bg-button text-white py-2 px-2 rounded-lg text-center w-fit grow"
              onClick={() => {
                setInput(suggestion);
                handleSend();
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="chat-box bg-gray-100 p-4 mb-4 rounded-lg h-80 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 mb-2 rounded-md ${
                message.isServer
                  ? "bg-blue-100 text-blue-900"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center bg-white px-2 rounded-3xl shadow-inner flex-nowrap">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            className="flex-1 px-2 text-gray-700 rounded-md focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="mx-1 bg-button text-white rounded-3xl ml-2 hover:opacity-70 transition-colors"
          >
            <img className="size-12" src={send1} alt="Send" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
