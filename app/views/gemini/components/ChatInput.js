// ChatInput.js
import { useEffect, useRef, useState } from "react";
import { setSuggestedResponses } from "@/app/store/chatSlice";
import { useDispatch } from "react-redux";
export default function ChatInput({ onSubmit, suggestion = '' }) {
  const [inputValue, setInputValue] = useState('');
  const textAreaRef = useRef(null);
const dispatch = useDispatch()
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
    </form>
  );
}
