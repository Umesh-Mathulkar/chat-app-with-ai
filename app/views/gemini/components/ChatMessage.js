import { apiUrl, localApiUrl } from "@/app/config/apiUrl";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import FileViewer from "./FileViewer";

export default function ChatMessage({ message, sender, timestamp, file }) {
  const [timeAgo, setTimeAgo] = useState("");
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (status !== "loading") {
      setUser(session?.user);
    }
  }, [session, status]);
  useEffect(() => {
    const calculateTimeAgo = () => {
      const now = new Date();
      const messageTime = new Date(timestamp);
      const timeElapsed = now - messageTime;
      const secondsElapsed = Math.floor(timeElapsed / 1000);
      const minutesElapsed = Math.floor(secondsElapsed / 60);
      const hoursElapsed = Math.floor(minutesElapsed / 60);
      const daysElapsed = Math.floor(hoursElapsed / 24);

      let result = `${daysElapsed}d ago`;
      if (hoursElapsed < 24) result = `${hoursElapsed}h ago`;
      if (minutesElapsed < 60) result = `${minutesElapsed}m ago`;
      if (secondsElapsed < 60) result = `${secondsElapsed}s ago`;

      setTimeAgo(result);
    };

    const timer = setInterval(calculateTimeAgo, 1000);
    calculateTimeAgo(); // Initial calculation

    return () => clearInterval(timer);
  }, [timestamp]);
  const isCurrentUser = user?.email === sender;
  const getMessageClass = () => {
    let messageClass =
      "rounded-lg bg-white text-gray-800 max-w-md w-auto mx-2 my-1 shadow-lg border border-gray-200 transition-all duration-300 ease-in-out";

    if (isCurrentUser) {
      messageClass += " items-end justify-end";
      messageClass += " hover:border-blue-400";
    } else {
      messageClass += " items-start justify-start";
      messageClass += " hover:border-emerald-400";
    }

    return messageClass;
  };

  const getTimeClass = () => {
    let timeClass = "px-4 py-1 text-xs text-white rounded-b-lg";

    if (isCurrentUser) {
      timeClass += " bg-blue-500";
    } else {
      timeClass += " bg-emerald-500";
    }

    return timeClass;
  };

  const API_URL = apiUrl;


  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className="flex flex-col items-end">
        <div className={getMessageClass()}>
          <div className="px-4 py-3">
            <p className="text-xs font-thin">{isCurrentUser?'You':sender}</p>
            <p className="text-sm font-medium">{message}</p>
            {file && (
              <FileViewer file={file} API_URL={API_URL} />
            )}
          </div>
          <div className={getTimeClass()}>
            {timeAgo}
          </div>
        </div>
      </div>
    </div>
  );
}