'use client'

import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import useChat from "../hooks/useChat";
import useChatScroll from "../hooks/useChatScroll";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import SuggestionBox from "../components/SuggestionBox";
import { useSession } from "next-auth/react";

export default function MyComponent({ params }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const receiver = decodeURIComponent(params.email[0]);

  const {
    chatHistory,
    suggestedResponses,
    setSuggestedResponses,
    handleUserInput,
    isLoading,
    setSelectedResponse,
    selectedResponse,
    setReceiver,
    setChatRoomId,
  } = useChat();

  useEffect(() => {
    if (status !== "loading") {
      setUser(session?.user);
    }
  }, [session, status]);

  useEffect(() => {
    const fetchChatroom = async () => {
      try {
        setReceiver(receiver);
        const response = await axios.post("/api/chats/chatroom", {participants:[
          receiver,
          user.email,
        ]});
        const chatroom = response.data.chatroom;
     
        setChatRoomId(chatroom._id);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchChatroom();
    }
  }, [receiver, user]);

  const chatContainerRef = useRef(null);
  const chatInputRef = useRef(null);

  useChatScroll(chatContainerRef, chatInputRef, chatHistory);

  const handleSuggestionClick = useCallback(
    (suggestion) => {
      setSelectedResponse(suggestion);
    },
    [setSelectedResponse]
  );

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div
        className="flex flex-col flex-1 overflow-y-auto p-4"
        ref={chatContainerRef}
      >
        {chatHistory.map((chat, index) => (
          <ChatMessage
            key={index}
            message={chat.message}
            sender={chat.sender}
            timestamp={chat.timestamp}
          />
        ))}
      </div>
      <div
        className="px-4 py-3 bg-white border-t border-gray-300 fixed bottom-0 w-full "
        ref={chatInputRef}
      >
        <SuggestionBox
          suggestedResponses={suggestedResponses}
          handleSuggestionClick={handleSuggestionClick}
          isLoading={isLoading}
        />
        <div className="max-w-[700px]">
          <ChatInput
            onSubmit={handleUserInput}
            suggestion={selectedResponse}
            setSuggestion={setSuggestedResponses}
          />
        </div>
      </div>
    </div>
  );
}
