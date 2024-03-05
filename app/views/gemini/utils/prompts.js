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

  // Enhanced relevance filtering
  const relevantHistory = chatHistory.filter(chat => {
     const keywords = userInput.toLowerCase().split(' '); // Split input into keywords
     return keywords.some(word => chat.message.toLowerCase().includes(word));
  });

  // Prioritize more recent messages
  const weightedSummaryPoints = relevantHistory.map((chat, index, arr) => {
    const weight = (arr.length - index) / arr.length; // Simple decay weighting
    return `- ${chat.message} (Relevance Weight: ${weight.toFixed(2)})`; 
  }).slice(0, 3);

  return `${conversationHistory}\n\n**Current Situation:** "${userInput}" was mentioned. **Here's the relevant context of our conversation:**\n* ${weightedSummaryPoints.join('\n')}\n\n**Relation Judgment:** please check conversation thoroughly and judge our relation to respond accordingly\n\n**Goal:** to generate suggestion directly focusing on current situation \n**Please provide 3 short, numbered suggestions for my reply only suggestion in the format no anyother text just suggestions i am saying this strictly as i can direclty use it and dont tell me it is supportive,encouraging etc. i know that:**\n`;
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
