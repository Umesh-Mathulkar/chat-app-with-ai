import { useEffect } from 'react';

const useChatScroll = (chatContainerRef, chatInputRef, chatHistory) => {
  // Scroll to bottom whenever chatHistory changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Adjust padding when input height changes
  useEffect(() => {
    if (chatContainerRef.current && chatInputRef.current) {
      chatContainerRef.current.style.paddingBottom = `${chatInputRef.current.offsetHeight}px`;
    }
  }, [chatInputRef.current?.offsetHeight]);
};

export default useChatScroll;
