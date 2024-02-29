// useChat.js
import { useState, useEffect, useRef } from "react";
import { generateResponse } from "../utils/responseGenerator";


export default function useChat() {
  const [chatHistory, setChatHistory] = useState([]);
  const [suggestedResponses, setSuggestedResponses] = useState([]);
  const [selectedResponse, setSelectedResponse]=useState('')
  const [isLoading, setIsLoading] = useState(false); 
  const requestQueue = useRef([]);
const MAX_REQUESTS= 5
  useEffect(() => {
    const processUserInput = async () => {
      if (requestQueue.current.length > 0) {
        setIsLoading(true); 
        const userInput = requestQueue.current[0];
        await generateResponse(userInput, chatHistory, setChatHistory, setSuggestedResponses);
        requestQueue.current = requestQueue.current.slice(1);
        setIsLoading(false); 
      }
    };
    processUserInput();
  }, [requestQueue.current]);

  const handleUserInput = (userInput) => {
    if (requestQueue.current.length < MAX_REQUESTS) {
      setChatHistory(prevChatHistory => [...prevChatHistory, { user: userInput }]);
      requestQueue.current = [...requestQueue.current, userInput];
    } else {
      console.warn("Request queue is full. Please wait for some requests to complete.");
    }
  };

  return { chatHistory, suggestedResponses, handleUserInput, isLoading,setSuggestedResponses,setSelectedResponse,selectedResponse };
}
