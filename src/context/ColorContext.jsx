import React, { createContext, useContext, useState, useEffect } from "react";
import colorSchemes from "../data/colorData"; // Import color data from colorData.js

// Create the ColorContext
const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  // Get the saved color index from localStorage (if it exists), otherwise default to 0
  const savedColorIndex = localStorage.getItem("colorIndex");
  const [currentColorIndex, setCurrentColorIndex] = useState(
    savedColorIndex ? parseInt(savedColorIndex, 10) : 0
  );

  // Function to change color sequentially
  const changeColor = () => {
    const newIndex = (currentColorIndex + 1) % colorSchemes.length;
    setCurrentColorIndex(newIndex);
    localStorage.setItem("colorIndex", newIndex); // Save the new color index in localStorage
  };

  const colorScheme = colorSchemes[currentColorIndex];

  return (
    <ColorContext.Provider value={{ colorScheme, changeColor }}>
      {children}
    </ColorContext.Provider>
  );
};

// Custom hook to access the ColorContext
export const useColorContext = () => {
  return useContext(ColorContext);
};
