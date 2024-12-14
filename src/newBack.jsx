import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import io from 'socket.io-client'; // Import Socket.io client
import send1 from './button.svg';
import wait from "./sq.svg";

export default function ChatInterface() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [connectionError, setConnectionError] = useState(false);

  const chatBoxRef = useRef(null);
  const dummyRef = useRef(null); // New ref for dummy div
  const textRef = useRef(null);
  // Reference to the socket instance
  const socketRef = useRef();

  // Initialize Socket.io and set up event listeners
  useEffect(() => {
    // Replace with your backend Socket.io server URL
    const socket = io("http://localhost:8000", { transports: ['websocket'] });

    socketRef.current = socket;

    // Handle incoming responses from the server
    socket.on('response', (data) => {
      const { message, context: newContext } = data;
      setMessages((prevMessages) => [...prevMessages, { text: message, isServer: true }]);
      setLoading(false);
    });

    // Handle typing indicators (optional)
    socket.on('typing', (data) => {
      const { message } = data;
      setMessages((prevMessages) => [...prevMessages, { text: message, isServer: true, isTyping: true }]);
    });

    // Handle connection errors
    socket.on('connect_error', (err) => {
      console.error("Connection Error:", err.message);
      setConnectionError(true);
    });

    // Handle successful connection
    socket.on('connect', () => {
      setConnectionError(false);
      console.log("Connected to the server");
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  // Handle sending a message
  const handleSend = () => {
    if (input.trim() && !loading) {
      setLoading(true);
      setMessages((prev) => [...prev, { text: input, isServer: false }]);
      setInput("");

      // Emit the message to the server with the current context
      socketRef.current.emit('send_message', { message: input, context: getCurrentContext() });
    }
  };

  // Function to retrieve the current conversation context
  const getCurrentContext = () => {
    // Concatenate all previous messages to form the context
    return messages
      .map((msg) => `${msg.isServer ? 'AI' : 'User'}: ${msg.text}`)
      .join('\n');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend();
    // Removed setVisible(false) as suggestions are no longer present
  };

  // Handle Enter key press for submitting
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey && !loading) {
      event.preventDefault();
      handleSend();
      // Removed setVisible(false) as suggestions are no longer present
    }
  };

  // Auto-scroll to the bottom of the chat box when messages change
  useEffect(() => {
    if (dummyRef.current) {
      dummyRef.current.scrollIntoView({ behavior: 'smooth' });
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
          {/* Connection Error Message */}
          {connectionError && (
            <div className="text-red-500 text-center mb-4">
              Unable to connect to the server. Please try again later.
            </div>
          )}

          {/* Header */}
          <div className="text-center text-dark mb-6">
            <h1 className="text-lg font-semibold">
              Hi! I'm here to help you. Type your question below!
            </h1>
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
                  className={`p-2 max-w-[75%] bg-opacity-90 rounded-lg break-words ${
                    message.isServer ? 'bg-white text-dark' : 'bg-purp text-white'
                  }`}
                >
                  {message.text}
                  {message.isTyping && (
                    <span className="loading-dots">...</span>
                  )}
                </div>
              </motion.div>
            ))}
            {/* Dummy div for auto-scroll */}
            <div ref={dummyRef} />
          </div>

          {/* Input */}
          <div className="flex items-center bg-white px-2 rounded-3xl shadow-inner">
            <textarea
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message"
              onInput={(e) => {
                e.target.style.height = 'auto'; // Reset height to calculate correctly
                e.target.style.height = `${e.target.scrollHeight}px`; // Set height to scrollHeight
              }}
              className="flex-1 px-2 py-1 text-dark focus:outline-none resize-none overflow-hidden rounded-3xl"
            />

            <button
              type="submit"
              disabled={!input.trim() || loading}
              className={`mx-1 rounded-3xl ml-2 transition-colors ${
                !input.trim() || loading ? 'opacity-70 cursor-not-allowed' : 'opacity-100'
              }`}
            >
              <img
                className="size-12 p-1" // Removed animate-spin
                src={loading ? wait : send1}
                alt="Send"
              />
            </button>
          </div>

        </form>
      </div>
    </motion.div>
  );
}
