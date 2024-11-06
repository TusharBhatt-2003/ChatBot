import { useState, useEffect, useRef } from "react";
import { generateResponse } from "../services/apiService";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import LoadingSpinner from "./LoadingSpinner";
import { useColorContext } from "../context/ColorContext";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css"; // Locomotive styles

const ChatBox = () => {
  const { colorScheme } = useColorContext();
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const chatContainerRef = useRef(null); // Ref to chat container
  const lastMessageRef = useRef(null); // Ref for the last message in conversation
  const locomotiveScrollRef = useRef(null); // Ref for Locomotive Scroll

  const handleSendMessage = async () => {
    if (!input) return;

    const newConversation = [...conversation, { question: input, response: "Loading..." }];
    setConversation(newConversation);

    const aiResponse = await generateResponse(input);

    const updatedConversation = [...newConversation];
    updatedConversation[updatedConversation.length - 1].response = aiResponse;
    setConversation(updatedConversation);

    setInput("");
  };

  useEffect(() => {
    Prism.highlightAll();

    // Initialize Locomotive Scroll
    locomotiveScrollRef.current = new LocomotiveScroll({
      el: chatContainerRef.current,
      smooth: true,
    });

    // Update Locomotive Scroll when conversation changes
    locomotiveScrollRef.current.update();

    // Scroll to the bottom of the chat
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }

    return () => {
      // Destroy the Locomotive Scroll instance on cleanup
      locomotiveScrollRef.current.destroy();
    };
  }, [conversation]);

  const formatResponse = (response) => {
    response = response.replace(/##(.*?)\n/g, `<p class='text-2xl font-extrabold mb-2' style='color:${colorScheme.textColor}'>$1</p>`);
    response = response.replace(/\*\*(.*?)\*\*/g, `<h1 class='text-lg font-bold mt-4' style='color:${colorScheme.textColor}'>$1</h1>`);
    response = response.replace(/^\*(.*?)$/gm, `<p class='text-sm font-thin ml-4' style='color:${colorScheme.textColor}'>$1</p>`);
    response = response.replace(/\*(.*?)\n/g, `<p class='text-sm font-thin ml-4' style='color:${colorScheme.textColor}'>$1</p>`);
    response = response.replace(/```javascript(.*?)```/gs, `<div class='mt-4'><pre class='p-4 bg-gray-900 rounded-lg'><code class='language-javascript'>$1</code></pre></div>`);
    return response;
  };

  return (
    <div className="flex flex-col w-full justify-between p-4 overflow-hidden" style={{ backgroundColor: colorScheme.bgColor }}>
      {/* Conversation Section */}
      <div
        className="flex-1 h-fit lg:px-20 overflow-y-auto space-y-4 p-4"
        ref={chatContainerRef} // Ref for Locomotive Scroll
        data-scroll-container
      >
        {conversation.map((entry, index) => (
          <div key={index} className="space-y-4" data-scroll-section>
            {/* User's question */}
            <div className="text-right">
              <div
                className="w-fit justify-self-end flex justify-center text-center items-center border-2 border-transparent px-2 py-1 rounded-lg"
                style={{ backgroundColor: colorScheme.textColor, color: colorScheme.bgColor }}
              >
                <p>{entry.question}</p>
              </div>
            </div>

            {/* AI's response */}
            <div className="flex items-start">
              {entry.response === "Loading..." ? (
                <LoadingSpinner />
              ) : entry.response.includes("```") ? (
                <div className="overflow-hidden">
                  <pre className="p-4 rounded-lg">
                    <code className="language-cpp">{entry.response.replace(/```/g, "").replace(/```/g, "")}</code>
                  </pre>
                </div>
              ) : (
                <div
                  className="inline-block border-2 px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: colorScheme.bgColor,
                    borderColor: colorScheme.textColor,
                    color: colorScheme.textColor,
                  }}
                  dangerouslySetInnerHTML={{ __html: formatResponse(entry.response) }}
                />
              )}
            </div>
          </div>
        ))}
        {/* Add a reference to the last message */}
        <div ref={lastMessageRef}></div>
      </div>

      {/* Input Section */}
      <div className="w-full p-4 flex items-center justify-around">
        <textarea
          rows="1"
          className="w-3/4 outline-none p-2 border-b-2 placeholder:text-[#47474760]"
          placeholder="Ask a question..."
          style={{
            backgroundColor: colorScheme.bgColor,
            color: colorScheme.textColor,
            borderColor: colorScheme.textColor,
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 rounded-lg"
          style={{
            backgroundColor: colorScheme.sendBtnColor,
            color: colorScheme.bgColor,
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
