// prompts.js

export const filterPrompt = (
  userInput
) => `Here's a user input that I intend to send to my AI chatbot: ${userInput}. Please classify it on the following categories:
* **Profanity:** Does it contain profanity, swear words, or vulgar language?
* **Hate Speech:** Does it express hate or discrimination towards any group or individual?
* **Other Objectionable:** Is it offensive or harmful in other ways?

Please provide your classification for each category (e.g., Profanity: Yes, Hate Speech: No, Other Objectionable: No)`;

export const generatePrompt = (userInput, chatHistory) => {
  // Filter chat history to the last 3 hours
  const now = new Date();
  const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000);
  chatHistory = chatHistory.filter(chat => chat.message !== null);
  const recentChatHistory = chatHistory.filter((chat) => {
    const chatTimestamp = new Date(chat.timestamp);
    return chatTimestamp >= threeHoursAgo;
  });

  // Format conversation history
  const conversationHistory = recentChatHistory
    .map((chat) => `User: ${chat.message}`)
    .join("\n");

  // Enhanced relevance filtering
  const relevantHistory = recentChatHistory.filter((chat) => {
    const keywords = userInput.toLowerCase().split(" ");
    return keywords.some((word) => chat.message.toLowerCase().includes(word));
  });

  // Prioritize more recent messages with relevance weighting
  const weightedSummaryPoints = relevantHistory
    .map((chat, index, arr) => {
      const weight = (arr.length - index) / arr.length;
      return `- ${chat.message} (Relevance Weight: ${weight.toFixed(2)})`;
    })
    .slice(0, 3);

  // Construct the final prompt
  return `${conversationHistory}\n\n**Current Situation:** "${userInput}" was mentioned. **Here's the relevant context of our conversation:**\n* ${weightedSummaryPoints.join("\n")}\n\n**Language adaption:** please use the language oand way of speaking from the past interaction\n**Relationship Judgement:**  Consider past interactions and judge my relationship. Are we formal, casual, friendly, etc.?\n\n**Goal:**  Provide 3 short, numbered, actionable suggestions for my reply. Tailor the tone and language to the inferred relationship and dont tell me that the suggestion is casual,formal etc or anything i know what is formal,casual,friendly you dont need to tell me that im saying this strictly dont tell me that for example i dont want  response like **Acknowledge their excitement:** "Haha, I'm glad you're excited about your new job!" i want only Haha, I'm glad you're excited about your new job!. ***SUGGESTIONS START*** \n`;
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
