"use client";

import React, { useEffect, useRef, useCallback } from "react";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import useChat from "./hooks/useChat";

import SuggestionBox from "./components/SuggestionBox";
import useChatScroll from "./hooks/useChatScroll";

export default function MyComponent() {
  const {
    chatHistory,
    suggestedResponses,
    setSuggestedResponses,
    handleUserInput,
    isLoading,
    setSelectedResponse,
    selectedResponse
  } = useChat();

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
          <ChatMessage key={index} message={chat.user} />
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
