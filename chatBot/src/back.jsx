import  { useState,useEffect } from 'react';
import send1 from  "./button.svg";

const ChatInterface = () => {
  const [input, setInput] = useState('');
  const suggestions = [
    "What courses are required for my major?",
    "Can I change my major or minor?",
    "How do I check my degree progress?",
    "What electives can I take for my degree?",
    "Where can I find information about course descriptions?"
  ];

  const handleSend = () => {
    if (input.trim()) {
      console.log("Sending message:", input); // Handle message sending
      setInput('');
    }
  };
 

  

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 p-4">
      <div className="bg-gray-200 w-full max-w-6xl p-6 rounded-lg shadow-lg px-8">
        {/* Header */}
        <div className="text-center text-gray-600 mb-6">
          <h1 className='text-lg font-semibold'>Hi! I'm here to help you. Select a topic below or type your question!</h1>
        </div>

        {/* Suggestions */}
        <div className="flex flex-wrap items-center gap-4  justify-items-center object-center p-10 mb-44">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="bg-button text-white py-2 px-2 rounded-lg text-center w-fit grow"
              onClick={() => {setInput(suggestion); handleSend();}}
            >
              {suggestion}
            </button>
          ))}
          
        </div>
        <div>
            <h1>{input}</h1>
        </div>

        {/* Message Input Area */}
        <div className="flex items-center bg-white px-2 rounded-3xl shadow-inner flex-nowrap">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            className="flex-1 px-2 text-gray-700 rounded-md focus:outline-none"
          />
          <button
            onClick={handleSend}
            className=" mx-1 bg-button text-white rounded-3xl ml-2  hover:opacity-70 transition-colors "
          >
            <img className='size-12' src={send1}></img>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
