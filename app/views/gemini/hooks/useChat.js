import { useEffect, useRef } from "react";
import { generateResponse } from "../utils/responseGenerator";
import { io } from "socket.io-client";
import { useSession } from "next-auth/react";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setUser, 
  setChatHistory, 
  setSuggestedResponses, 
  setSelectedResponse, 
  setChatRoomId, 
  setIsLoading, 
  setReceiver, 
  addChatMessage
} from '@/app/store/chatSlice';

const useChat = () => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const chatState = useSelector(state => state.chat);
  const socketRef = useRef();
  const requestQueue = useRef([]);

  useEffect(() => {
    if(status !== 'loading'){
      dispatch(setUser(session?.user));
    } 
  }, [session, status]);

  useEffect(() => {
    const socket = io.connect("https://chat-app-socket-server-0vpr.onrender.com");

    socket.on("message", async (data) => {
      // Dispatch an action to append the new message to the chat history
      dispatch(addChatMessage(data));

      // Check if the new message was sent by the receiver
      if (data.sender !== chatState.user.email) {
        generateResponse(
          data.message,
          chatState.chatHistory,
          dispatch
        );
      }
    });

    const fetchMessages = async () => {
      try {
        if (chatState.chatRoomId) {
          const response = await axios.get(
            `https://chat-app-socket-server-0vpr.onrender.com/api/chat/messages/${chatState.chatRoomId}?timestamp=${chatState.chatHistory.length ? chatState.chatHistory[chatState.chatHistory.length - 1].timestamp : ""}`
          );
          const messages = response.data;
          if (messages.length) {
            dispatch(setChatHistory([...chatState.chatHistory, ...messages]));
          }
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
  }, [chatState.chatRoomId]);


  const handleUserInput = (userInput) => {
    if (userInput) {
      socketRef.current.emit('chatMessage', userInput, [chatState.user.email, chatState.receiver], chatState.user.email);
      requestQueue.current = [...requestQueue.current, userInput];
    }
  };

  return {
    handleUserInput,
  };
}

export default useChat;
