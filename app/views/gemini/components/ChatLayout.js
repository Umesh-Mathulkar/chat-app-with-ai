import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import SuggestionBox from "./SuggestionBox";

const ChatLayout = ({ children, user }) => {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <div className="sticky top-0 z-10">
        <ChatHeader user={user} />
      </div>
      <div className="overflow-y-auto">
        {children}
      </div>
      <div className="sticky bottom-0 z-10">
        <ChatFooter />
      </div>
    </div>
  );
};

export default ChatLayout;