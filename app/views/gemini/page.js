"use client";
// MyComponent.js
import { useEffect } from "react";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import useChat from "./components/useChat";

export default function MyComponent() {
  const {
    chatHistory,
    suggestedResponses,
    setSuggestedResponses,
    handleUserInput,
    isLoading,
  } = useChat();

  const handleSuggestionClick = (suggestion) => {
    setSuggestedResponses([suggestion]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex flex-col flex-1 overflow-y-auto p-4 space-y-4">
        {chatHistory.map((chat, index) => (
          <ChatMessage key={index} message={chat.user} />
        ))}
      </div>
      <div className="px-4 py-3 bg-white border-t border-gray-300">
        <ChatInput
          onSubmit={handleUserInput}
          suggestion={suggestedResponses[0]}
          setSuggestion={setSuggestedResponses}
        />
        <div className="mt-2 flex flex-wrap justify-start items-center gap-2 p-2">
          {isLoading ? (
            // Skeleton loaders
            <>
              <div className="animate-pulse text-sm font-medium py-2 px-4 bg-gray-300 rounded-md w-24"></div>
              <div className="animate-pulse text-sm font-medium py-2 px-4 bg-gray-300 rounded-md w-24"></div>
              <div className="animate-pulse text-sm font-medium py-2 px-4 bg-gray-300 rounded-md w-24"></div>
            </>
          ) : (
            suggestedResponses &&
            suggestedResponses.map((suggestion, index) => (
              <button
                key={index}
                className="text-sm font-medium py-2 px-4 bg-white text-gray-800  hover:bg-gray-100 rounded-md border border-gray-300 transition ease-in-out duration-150"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
