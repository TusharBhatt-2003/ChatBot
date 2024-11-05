import { useState, useEffect } from "react";
import { generateResponse } from "../services/apiService";
import LoadingSpinner from "./LoadingSpinner";  // Import the loading spinner
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

const ChatBox = () => {
  const [input, setInput] = useState("");  // User input for new question
  const [conversation, setConversation] = useState([]);  // Conversation log

  const handleSendMessage = async () => {
    if (!input) return;  // Avoid sending empty questions

    // Add the user's question to the conversation
    const newConversation = [...conversation, { question: input, response: "Loading..." }];
    setConversation(newConversation);

    // Get the AI response
    const aiResponse = await generateResponse(input);

    // Update the conversation with the AI's response
    const updatedConversation = [...newConversation];
    updatedConversation[updatedConversation.length - 1].response = aiResponse;
    setConversation(updatedConversation);

    // Clear the input field
    setInput("");
  };

  useEffect(() => {
    Prism.highlightAll();  // Apply syntax highlighting to all code blocks
  }, [conversation]);  // Re-run when the conversation updates

  return (
    <div className="flex flex-col h-screen w-full justify-between bg-black p-4">
      {/* Conversation Section */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {conversation.map((entry, index) => (
          <div key={index} className="space-y-2">
            {/* User's question */}
            <div className="text-right">
              <div className="inline-block bg-black border-2 border-white text-white px-4 py-2 rounded-lg">
                {entry.question}
              </div>
            </div>

            {/* AI's response */}
            <div className="flex items-start">
              
                {entry.response === "Loading..." ? (
                  <LoadingSpinner />
                ) : entry.response.includes("```") ? (
                  <div className="">
                  <pre className="p-4 rounded-lg overflow-auto">
                    <code className="language-cpp">
                      {entry.response.replace(/```cpp/g, "").replace(/```/g, "")}
                    </code>
                  </pre>
                  </div>
                ) : (
                  <div className="inline-block bg-white text-black px-4 py-2 rounded-lg">{entry.response}</div>
                )}
              </div>
            </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="border-t w-full p-4 flex items-center justify-between">
        <textarea
          rows='1'
          className="w-3/4  p-2 border rounded-lg "
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
