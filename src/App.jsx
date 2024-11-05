import { useState } from "react";
import ChatBox from "./components/ChatBox";

import { generateResponse } from "./services/apiService";


const App = () => {
  const [questions, setQuestions] = useState('');
  const [messages, setMessages] = useState([]);

  const handleGenerateResponse = async () => {
    const newMessage = { question: questions, response: 'Loading...' };
    setMessages((prevMessages) => [...prevMessages, newMessage]); // Add question to messages

    const aiResponse = await generateResponse(questions);
    
    setMessages((prevMessages) =>
      prevMessages.map((msg, index) =>
        index === prevMessages.length - 1
          ? { ...msg, response: aiResponse }
          : msg
      )
    );
    
    setQuestions(''); // Clear input after sending
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-black">
      <p className="text-3xl font-bold text-white mb-4">ChatBot</p>
      <ChatBox/>
    </div>
  );
};

export default App;
