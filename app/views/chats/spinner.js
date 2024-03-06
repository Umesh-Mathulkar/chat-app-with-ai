import { useEffect, useRef } from "react";

const TypingEffect = () => {
  const textRef = useRef(null);
  const texts = ["Your chats are secure...", "We value your privacy...", "Stay connected with us..."];
  let textIndex = 0;
  let charIndex = 0;

  useEffect(() => {
    const typeText = () => {
        if (textRef.current) {
          if (charIndex < texts[textIndex].length) {
            textRef.current.value += texts[textIndex].charAt(charIndex);
            charIndex++;
            const timeout = Math.floor(Math.random() * 150) + 80;
            setTimeout(typeText, timeout);
          } else {
            // Reset charIndex and clear the input field after a delay
            setTimeout(() => {
              if (textRef.current) {
                charIndex = 0;
                textRef.current.value = "";
                // Move to next text
                textIndex = (textIndex + 1) % texts.length;
                // Start typing again
                typeText();
              }
            }, 4000); // 4 seconds delay
          }
        }
      };
      
    typeText();

    return () => {
        if (textRef.current) {
          textRef.current.value = "";
        }
      };
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className=" "> {/* Basic styles */}
        <input
          ref={textRef}
          type="text"
          className="w-64 px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none rounded-md shadow-2xl"
          disabled
        />
      </div>
    </div>
  );
};

export default TypingEffect;
