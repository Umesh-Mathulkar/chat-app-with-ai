const ChatHeader = ({ user }) => { 
  return (
    <div className="w-full px-4 py-3 bg-white border-b border-gray-300"> 
      <h2 className="text-xl tracking-widest">{user}</h2>
    </div>
  )
}

  
  export default ChatHeader
  