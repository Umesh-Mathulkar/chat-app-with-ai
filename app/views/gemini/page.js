"use client";
import { useEffect, useRef } from "react";
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

  const chatContainerRef = useRef(null);
  const chatInputRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom when chat history updates
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  useEffect(() => {
    if (chatContainerRef.current && chatInputRef.current) {
      chatContainerRef.current.style.paddingBottom = `${chatInputRef.current.offsetHeight}px`;
    }
  }, [chatHistory, chatInputRef.current?.offsetHeight]);

  const handleSuggestionClick = (suggestion) => {
    setSuggestedResponses([suggestion]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex flex-col flex-1 overflow-y-auto p-4" ref={chatContainerRef}>
        {chatHistory.map((chat, index) => (
          <ChatMessage key={index} message={chat.user} />
        ))}
      </div>
      <div className="px-4 py-3 bg-white border-t border-gray-300 fixed bottom-0 w-full" ref={chatInputRef}>
        <div className="flex flex-col">
          <div className="mt-2 flex flex-wrap justify-start items-center gap-2 p-2">
            {isLoading ? (
              // Skeleton loaders
              Array(3).fill().map((_, index) => (
                <div key={index} className="animate-pulse text-sm font-medium py-2 px-4 bg-gray-300 rounded-md w-24"></div>
              ))
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
          <ChatInput
            onSubmit={handleUserInput}
            suggestion={suggestedResponses[0]}
            setSuggestion={setSuggestedResponses}
          />
        </div>
      </div>
    </div>
  );
}
