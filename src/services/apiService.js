import axios from "axios";

export const generateResponse = async (questions) => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY; // Access the API key from .env

    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json" // Ensure the content type is set to JSON
      },
      data: {
        contents: [{ parts: [{ text: questions }] }]
      }
    });

    // Check for response validity
    if (response.data.candidates && response.data.candidates.length > 0) {
      const generatedText = response.data.candidates[0].content.parts[0].text;
      return generatedText;
    } else {
      return "No content generated.";
    }
  } catch (error) {
    console.error("Error generating response:", error);
    return "Error generating response.";
  }
};
