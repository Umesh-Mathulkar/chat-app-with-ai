import { useDispatch, useSelector } from "react-redux";
import SuggestionBox from "./SuggestionBox";
import { useCallback } from "react";
import useChat from "../hooks/useChat";
import { setSelectedResponse } from "@/app/store/chatSlice";
import ChatInput from "./ChatInput";

const ChatFooter = ({className}) => {
    const dispatch = useDispatch();
  const { suggestedResponses, selectedResponse, isLoading, chatRoomId } =
    useSelector((state) => state.chat);
  const { handleUserInput } = useChat();

  const handleSuggestionClick = useCallback(
    (suggestion) => {
      dispatch(setSelectedResponse(suggestion));
    },
    [setSelectedResponse]
  );
  return (
    <div className={`w-full px-4 py-3 bg-white border-t border-gray-300 ${className}`}> 
      <SuggestionBox
        suggestedResponses={suggestedResponses}
        handleSuggestionClick={handleSuggestionClick}
        isLoading={isLoading}
      />
      <div className="max-w-[700px]">
        <ChatInput onSubmit={handleUserInput} suggestion={selectedResponse} />
      </div>
    </div>
  );
};

export default ChatFooter;
