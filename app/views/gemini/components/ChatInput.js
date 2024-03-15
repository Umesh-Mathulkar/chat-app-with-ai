import { useEffect, useRef, useState } from "react";
import { setSuggestedResponses } from "@/app/store/chatSlice";
import { useDispatch } from "react-redux";
import { AiFillFileImage } from "react-icons/ai";

export default function ChatInput({ onSubmit, suggestion = "" }) {
  const [inputValue, setInputValue] = useState("");
  const [isFile, setIsFile] = useState(false);
  const textAreaRef = useRef(null);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  useEffect(() => {
    setInputValue(suggestion);
  }, [suggestion]);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [inputValue]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const file = fileInputRef.current.files[0];
    onSubmit(inputValue, file);
    setInputValue("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    dispatch(setSuggestedResponses(""));
  };



  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-end space-y-3 p-3 rounded-lg bg-white transition ease-in-out duration-300"
    >
      <div className="w-full">
        <textarea
          ref={textAreaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
          className="w-full resize-none p-2 text-sm text-gray-700 bg-gray-50 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 hover:shadow"
          rows="1"
          style={{ overflowY: "auto", maxHeight: "200px" }}
        />
      </div>
      <div className="flex w-full justify-between items-center space-x-2">
        {!isFile && (
          <AiFillFileImage
            className="cursor-pointer text-gray-500"
            size={40}
            onClick={() => setIsFile(true)}
          />
        )}
        {isFile && (
          <input
            ref={fileInputRef}
            type="file"
            className="p-2 text-sm text-gray-700 bg-gray-50 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 hover:shadow"
          />
        )}
        <button
          type="submit"
          className="px-4 py-2 text-white transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 transition-all duration-500 ease-in-out hover:animate-pulse"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </form>
  );
  
  
}
