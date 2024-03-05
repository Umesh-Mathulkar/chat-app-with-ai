// ChatMessage.js
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function ChatMessage({ message,sender, timestamp  }) {
  const [timeAgo, setTimeAgo] = useState('');
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  useEffect(() => {
    if(status !== 'loading'){
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
  
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className="flex flex-col items-end">
        <div className={`rounded-lg bg-white text-gray-800 max-w-md w-auto mx-2 my-1 shadow-lg border border-gray-200 transition-all duration-300 ease-in-out hover:shadow-2xl hover:border-blue-400 ${isCurrentUser ? 'items-end' : 'items-start'}`}>
          <div className="px-4 py-3">
            <p className="text-xs font-thin">{sender}</p>
            <p className="text-sm font-medium">{message}</p>
          </div>
          <div className={`px-4 py-1 ${isCurrentUser ? 'bg-blue-500' : 'bg-emerald-500'}  text-xs text-white rounded-b-lg`}>
            {timeAgo}
          </div>
        </div>
      </div>
    </div>
  );
}