import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";

import SuggestionBox from "./SuggestionBox";

const ChatLayout = ({ children, user }) => {
    return (
      <div className="flex flex-col min-h-screen justify-between">
        <ChatHeader user={user} /> 
        <div className="overflow-y-auto">
          {children}
        </div>
        <ChatFooter /> 
      </div>
    );
  };
  

export default ChatLayout;
