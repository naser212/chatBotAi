import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import send1 from './button.svg';
import wait from "./sq.svg";

export default function ChatInterface()  {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  const chatBoxRef = useRef(null);
  const textRef = useRef (null);

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
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch server response");
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Error communicating with the server:", error);
      return "Oops! Something went wrong.";
    }
  };

  // Handle sending a message
  const handleSend = async () => {
    if (input.trim() && !loading) {
      setLoading(true);
      setMessages((prev) => [...prev, { text: input, isServer: false }]);
      setInput("");
      
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;

      // Send the message to the server
      const serverResponse = await sendMessageToServer(input);

      // Add the server's response
      setMessages((prev) => [...prev, { text: serverResponse, isServer: true }]);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend();
    setVisible(false);
  };

  // Handle Enter key press for submitting
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey && loading) {
      event.preventDefault();
    }
    if (event.key === 'Enter' && !event.shiftKey && !loading) {
      event.preventDefault();
      handleSend();
    }
  };

  // Handle clicking a suggestion
  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    handleSend();
    setVisible(false);
  };

  // Auto-scroll to the bottom of the chat box when messages change
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      textRef.current.focus();
      if (textRef.current){
      textRef.current.style.height = "auto";}

    }
  }, [messages]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.7,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01]
      }}
    >
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-white p-4 overflow-auto">
        <form
          className="bg-ramd w-full max-w-6xl p-6 rounded-lg shadow-lg px-8 flex flex-col justify-between h-full min-h-96"
          onSubmit={handleSubmit}
        >
          {/* Header */}
          <div className={`text-center text-dark mb-6 ${!visible ? "hidden" : null}`}>
            <h1 className="text-lg font-semibold">
              Hi! I'm here to help you. Select a topic below or type your question!
            </h1>
          </div>

          {/* Suggestions */}
          <div
            className={`flex flex-wrap items-center gap-4 ${!visible ? "hidden" : null} justify-items-center object-center p-10 mb-4`}
          >
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="bg-button text-white py-2 px-2 rounded-lg text-center w-fit grow"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Messages */}

          <div
  ref={chatBoxRef}
  className="chat-box bg-ramd py-4 px-8 mb-4 rounded-3xl h-full overflow-y-auto text-base flex-wrap"
>
  {messages.map((message, index) => (
    <motion.div
      key={index}
      className={`flex ${message.isServer ? 'justify-start' : 'justify-end'} mb-2`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div
        className={`p-2 max-w-[75%] bg-opacity-90 rounded-lg break-words ${message.isServer ? 'bg-white text-dark' : 'bg-purp text-white'}`}
      >
        {message.text}
      </div>
    </motion.div>
  ))}
</div>

          {/* Input */}
          <div className="flex items-center bg-white px-2 rounded-3xl shadow-inner  ">
            <textarea
              ref={textRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message"
              onInput={(e) => {
                e.target.style.height = 'auto'; // Reset height to calculate correctly
                e.target.style.height = `${e.target.scrollHeight}px`; // Set height to scrollHeight
              }}
              className="flex-1 px-2 py-1 text-dark  focus:outline-none resize-none overflow-hidden rounded-3xl  "
            />

            <button
              type="submit"
              disabled={!input.trim() || loading}
              className={`mx-1 rounded-3xl ml-2 transition-colors ${!input.trim() || loading ? 'opacity-70' : 'opacity-100'}`}
            >
              <img className={`size-12 p-1 ${loading ? "delay-200":null}`} src={loading ? wait : send1} alt="Send" />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};


