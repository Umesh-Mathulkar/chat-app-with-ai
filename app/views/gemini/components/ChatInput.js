import React, { useEffect, useRef, useState } from "react";
import { setSuggestedResponses } from "@/app/store/chatSlice";
import { useDispatch } from "react-redux";
import useChat from "../hooks/useChat";


export default function ChatInput({ onSubmit, suggestion = '' }) {
  const [inputValue, setInputValue] = useState('');
  const textAreaRef = useRef(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { handleUserFile } = useChat();

  useEffect(() => {
    setInputValue(suggestion);
  }, [suggestion]);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  }, [inputValue]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(inputValue);
    setInputValue('');
    dispatch(setSuggestedResponses(''));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleUserFile(file);
      event.target.value = null; // Reset the file input
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end space-x-3 p-3 rounded-lg bg-white transition ease-in-out duration-300">
      <textarea
        ref={textAreaRef}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder="Type a message..."
        className="flex-grow resize-none p-2 text-sm text-gray-700 bg-gray-50 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 hover:shadow-sm"
        rows="1"
        style={{ overflowY: 'auto', maxHeight: '100px' }}
      />
      <div className="flex flex-col items-center space-y-2">
        <button
          type="submit"
          className="flex items-center justify-center px-4 py-2 transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white transition-all duration-500 ease-in-out hover:animate-pulse"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
        <label htmlFor="fileInput" className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500 hover:text-gray-700"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <input
          type="file"
          id="fileInput"
          ref={fileInputRef}
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
      </div>
    </form>
  );
}