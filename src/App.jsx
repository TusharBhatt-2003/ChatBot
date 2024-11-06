import React from "react";
import ChatBox from "./Components/ChatBox";
import { ColorProvider, useColorContext } from "./context/ColorContext"; // Import ColorProvider and custom hook

const App = () => {
  return (
    <ColorProvider>
      <MainApp />
    </ColorProvider>
  );
};

const MainApp = () => {
  const { colorScheme, changeColor } = useColorContext();

  return (
    <div
      className="flex py-5 flex-col h-screen justify-end items-center"
      style={{ backgroundColor: colorScheme.bgColor }} // Apply dynamic background color
    >
      {/* Clickable ChatBot header */}
      <p
        className="fixed top-0 text-3xl font-bold cursor-pointer"
        style={{ color: colorScheme.textColor }} // Apply dynamic text color
        onClick={changeColor} // Change color sequentially on click
      >
        ChatBot
      </p>

      <ChatBox />
    </div>
  );
};

export default App;
