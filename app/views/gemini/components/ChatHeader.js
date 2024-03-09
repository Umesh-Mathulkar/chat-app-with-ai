const ChatHeader = ({ user, className }) => {
  return (
    <div
      className={`w-full px-4 py-3 bg-white border-b border-gray-300 ${className}`}
    >
      <h2 className="text-lg tracking-widest">{user}</h2>
    </div>
  );
};

export default ChatHeader;
