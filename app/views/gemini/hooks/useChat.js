import { useEffect, useRef, useState } from "react";
import { generateResponse } from "../utils/responseGenerator";
import { io } from "socket.io-client";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  setChatHistory,
  addChatMessage,
  clearChats,
} from "@/app/store/chatSlice";
import { apiUrl, localApiUrl } from "@/app/config/apiUrl";

const useChat = () => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const chatState = useSelector((state) => state.chat);

  const socketRef = useRef();
  const requestQueue = useRef([]);

  const API_URL = apiUrl;
  useEffect(() => {
    if (status !== "loading") {
      dispatch(setUser(session?.user));
    }
  }, [session, status]);
  useEffect(() => {
    dispatch(clearChats());
    const socket = io.connect(API_URL);
    socket.on("message", async (data) => {
      // Dispatch an action to append the new message to the chat history
      dispatch(addChatMessage(data));
    });
    socket.emit("joinRoom", chatState.chatRoomId);
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchMessages = async () => {
      try {
        if (chatState.chatRoomId) {
          const response = await axios.get(
            `${API_URL}/api/chat/messages/${chatState.chatRoomId}?timestamp=${
              chatState.chatHistory.length
                ? chatState.chatHistory[chatState.chatHistory.length - 1]
                    .timestamp
                : ""
            }`,
            { signal }
          );
          const messages = response.data;

          if (messages.length) {
            dispatch(setChatHistory(messages));
          }
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error("Error fetching messages:", error);
        }
      }
    };
    fetchMessages();
    socketRef.current = socket;
    return () => {
      controller.abort();
      socket.disconnect();
    };
  }, [chatState.chatRoomId]);
  useEffect(() => {
    if (chatState.chatHistory.length > 0) {
      const lastMessage =
        chatState.chatHistory[chatState.chatHistory.length - 1];
      if (lastMessage.sender !== chatState.user.email) {
        generateResponse(lastMessage.message, chatState.chatHistory, dispatch);
      }
    }
  }, [chatState.chatHistory]);
  const handleUserInput = (userInput, file) => {
    if (userInput || file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // Emit the file data and the original filename over the WebSocket
        socketRef.current.emit(
          "chatMessage",
          userInput,
          [chatState.user.email, chatState.receiver],
          chatState.user.email,
          chatState.chatRoomId,
          event.target.result,
          file.name
        );
      };
      if (file) {
        reader.readAsArrayBuffer(file);
      } else {
        socketRef.current.emit(
          "chatMessage",
          userInput,
          [chatState.user.email, chatState.receiver],
          chatState.user.email,
          chatState.chatRoomId
        );
      }
      requestQueue.current = [...requestQueue.current, userInput];
    }
  };
  return {
    handleUserInput,
  };
};
export default useChat;
