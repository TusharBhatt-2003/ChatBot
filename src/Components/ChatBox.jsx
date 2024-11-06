import { useState, useEffect } from "react";
import { generateResponse } from "../services/apiService";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import LoadingSpinner from "./LoadingSpinner";

const ChatBox = () => {
  const [input, setInput] = useState(""); // User input for new question
  const [conversation, setConversation] = useState([]); // Conversation log

  const handleSendMessage = async () => {
    if (!input) return; // Avoid sending empty questions

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
    Prism.highlightAll(); // Apply syntax highlighting to all code blocks
  }, [conversation]); // Re-run when the conversation updates

  // Function to format the response
  const formatResponse = (response) => {
  
    response = response.replace(/##(.*?)\n/g, "<p class='text-2xl font-extrabold mb-2'>$1</p>");

    response = response.replace(/\*\*(.*?)\*\*/g, "<h1 class='text-lg font-bold mt-4'>$1</h1>");

    response = response.replace(/^\*(.*?)$/gm, "<p class='text-sm font-thin ml-4'>$1</p>");
 
    response = response.replace(/\*(.*?)\n/g, "<p class='text-sm font-thin ml-4'>$1</p>");
   
    response = response.replace(/```javascript(.*?)```/gs, "<div class='mt-4'><pre class='p-4 bg-gray-900 rounded-lg'><code class='language-javascript'>$1</code></pre></div>");
    return response;
  };

  return (
    <div className="flex flex-col h-screen w-full justify-between bg-black p-4  overflow-hidden">
      {/* Conversation Section */}
      <div className="flex-1 lg:px-20 overflow-y-auto space-y-4 p-4 scroll-smooth scroll overflow-hidden">
        {conversation.map((entry, index) => (
          <div key={index} className="space-y-4 overflow-hidden">
            {/* User's question */}
            <div className="text-right overflow-hidden">
              <div className="inline-block overflow-hidden bg-white border-2 border-transparent text-black px-4 py-2 rounded-lg">
                {entry.question}
              </div>
            </div>

            {/* AI's response */}
            <div className="flex items-start overflow-hidden">
              {entry.response === "Loading..." ? (
                <LoadingSpinner />
              ) : entry.response.includes("```") ? (
                <div className="overflow-hidden">
                  <pre className="p-4 rounded-lg overflow-hidden">
                    <code className="language-cpp overflow-hidden">
                      {entry.response.replace(/```cpp/g, "").replace(/```/g, "")}
                    </code>
                  </pre>
                </div>
              ) : (
                <div
                  className="inline-block overflow-hidden bg-black border-2 border-white text-white px-4 py-2 rounded-lg"
                  dangerouslySetInnerHTML={{ __html: formatResponse(entry.response) }} // Use formatted response
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="w-full p-4 flex items-center justify-around">
        <textarea
          rows="1"
          className="w-3/4 bg-black text-white border-white outline-none p-2 border-b-2 "
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
