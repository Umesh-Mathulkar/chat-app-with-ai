// prompts.js

export const filterPrompt = (
  userInput
) => `Here's a user input that I intend to send to my AI chatbot: ${userInput}. Please classify it on the following categories:
* **Profanity:** Does it contain profanity, swear words, or vulgar language?
* **Hate Speech:** Does it express hate or discrimination towards any group or individual?
* **Other Objectionable:** Is it offensive or harmful in other ways?

Please provide your classification for each category (e.g., Profanity: Yes, Hate Speech: No, Other Objectionable: No)`;

export const generatePrompt = (userInput, chatHistory) => {

  const conversationHistory = chatHistory
    .map((chat) => `User: ${chat.message}`)
    .join("\n");

  return `${conversationHistory}\n\n**Current Situation:** "${userInput}" was mentioned. **Here's the relevant context of our
   conversation:**\n* [Summarize 2-3 key points from the history]\n\n**Relation Judgment:** Based on our conversation, judge the 
   relationship between us and provide suggestions accordingly.\n\n**Goal:** I want to respond in a friendly manner,
     adapting to the language used in our chat. **Please provide 3 short, numbered suggestions for my reply:**\n`;
};


export const rewritePrompt = (
  text
) => `Given the following text: "${text}", please rewrite it in a respectful and polite manner. Ensure that it does not contain any profanity, hate speech, or other objectionable content. Here are some additional guidelines:

* **Preserve the original meaning:** As much as possible, maintain the core idea the user is trying to convey.
* **Change the tone:** Focus on making the text more neutral or even positive if appropriate. 
* **Provide single options:** Offer single best line.

Here's an example to help you:

Original: "Your idea is stupid and I hate it."

Possible rewrites:
  * "I don't think that approach will work well. Here's why..."
  * "I'm not sure I agree with your perspective. Could you explain it further?"
  * "Let's explore some different options to find a better solution."
`;
