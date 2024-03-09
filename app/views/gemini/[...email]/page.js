"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import useChat from "../hooks/useChat";
import useChatScroll from "../hooks/useChatScroll";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import SuggestionBox from "../components/SuggestionBox";
import { useSession } from "next-auth/react";
import {
  setSelectedResponse,
  setReceiver,
  setChatRoomId,
  clearChats,
} from "@/app/store/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader/Loader";
import ChatLayout from "../components/ChatLayout";
export default function MyComponent({ params }) {
  const { data: session, status } = useSession();
  const messagesEndRef = useRef(null);
  const [user, setUser] = useState(null);
  const [chatsLoading, setIsChatsLoading] = useState(true);
  const receiver = decodeURIComponent(params.email[0]);

  const { chatHistory } = useSelector((state) => state.chat);

  const dispatch = useDispatch();

  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (status !== "loading") {
      setUser(session?.user);
    }
  }, [session, status]);

  useEffect(() => {
    const fetchChatroom = async () => {
      try {
        await dispatch(setReceiver(receiver));
        const response = await axios.post("/api/chats/chatroom", {
          participants: [receiver, user.email],
        });
        const chatroom = response.data.chatroom;

        await dispatch(setChatRoomId(chatroom._id));
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchChatroom();
    }
  }, [receiver, user]);

  useEffect(() => {
    // Set a small delay before rendering the chat messages
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 2000);

    // Clear the timeout when the component is unmounted
    return () => {
      clearTimeout(timer);
    };
  }, []);
  
  useEffect(() => {
    if (shouldRender) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [shouldRender,chatHistory]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <ChatLayout  user={receiver}>
        <div className="flex flex-col flex-1 overflow-y-auto p-4">
          {shouldRender ? (
            chatHistory.map((chat, index) => (
              <ChatMessage
                key={index}
                message={chat.message}
                sender={chat.sender}
                timestamp={chat.timestamp}
              />
            ))
          ) : (
            <Loader isLoading={!shouldRender}></Loader>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ChatLayout>
    </div>
  );
}
