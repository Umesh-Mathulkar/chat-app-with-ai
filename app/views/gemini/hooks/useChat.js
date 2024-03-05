// useChat.js
import { useState, useEffect, useRef } from "react";
import { generateResponse } from "../utils/responseGenerator";
import { io } from "socket.io-client";
import { useSession } from "next-auth/react";
import axios from 'axios';

const useChat = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [suggestedResponses, setSuggestedResponses] = useState([]);
  const [selectedResponse, setSelectedResponse] = useState("");
  const [chatRoomId, setChatRoomId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const[receiver,setReceiver]=useState('')
  const socketRef = useRef();
  const requestQueue = useRef([]);

  useEffect(() => {
    if(status !== 'loading'){
      setUser(session?.user);
    } 
  }, [session, status]);

  useEffect(() => {
    const socket = io.connect("https://chat-app-socket-server-0vpr.onrender.com");

    socket.on("message", (data) => {
      setChatHistory((prevChatHistory) => [...prevChatHistory,  data ]);
    });

    const fetchMessages = async () => {
      try {
        if(chatRoomId){
        const response = await axios.get(`https://chat-app-socket-server-0vpr.onrender.com/api/chat/messages/${chatRoomId}`);
        const messages = response.data;
    
        setChatHistory(messages);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [chatRoomId]);

  useEffect(() => {
    const processUserInput = async () => {
      if (requestQueue.current.length > 0) {
        setIsLoading(true);
        const userInput = requestQueue.current.shift();
        await generateResponse(
          userInput,
          chatHistory,
          setChatHistory,
          setSuggestedResponses
        );
        setIsLoading(false);
      }
    };
    processUserInput();
  }, [requestQueue.current]);

  const handleUserInput = (userInput) => {
    if (userInput) {
      socketRef.current.emit('chatMessage', userInput, [user.email, receiver], user.email);
      requestQueue.current = [...requestQueue.current, userInput];
    }
  };

  return {
    chatHistory,
    suggestedResponses,
    handleUserInput,
    isLoading,
    setSuggestedResponses,
    setSelectedResponse,
    selectedResponse,
    setReceiver,
    setChatRoomId
  };
}

export default useChat;
