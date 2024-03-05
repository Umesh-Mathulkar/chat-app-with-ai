"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

const ChatRoom = ({ chatroomId }) => {
  const { data: session, status } = useSession();
  // If session is loading, return null to avoid trying to access session.user.email
  const [user, setUser] = useState(null);
  useEffect(() => {
    if(status!='loading'){
    setUser(session.user)
    }
  }, [session, status]);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socketRef = useRef();
  const participants = [user?.email, "mathulkar98@gmail.com"];
  useEffect(() => {
    socketRef.current = io.connect("https://chat-app-socket-server-0vpr.onrender.com");

    socketRef.current.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    // Fetch existing messages when the component mounts
    fetch(`https://chat-app-socket-server-0vpr.onrender.com/api/chat/messages/65e5fe0f8892612ed1359aa3`)
      .then((response) => response.json())
      .then((messages) => {
        setMessages(messages);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });

    return () => {
      socketRef.current.disconnect();
    };
  }, [chatroomId]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      // Emit the message, chatroom ID, and user ID to the server
      socketRef.current.emit('chatMessage', message, participants, session.user.email);
      setMessage("");
    }
  };

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            {/* Display sender and timestamp */}
            {message.sender}: {message.message} (
            {new Date(message.timestamp).toLocaleString()})
          </li>
        ))}
      </ul>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatRoom;
