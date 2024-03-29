// responseGenerator.js
import { getGenerativeModel, generateContentWithRetry } from "./chatAPI";
import { isTextObjectionable } from "./chatUtils";
import { parseSuggestions } from "./chatParser";
import { filterPrompt, generatePrompt } from "./prompts";
import { warningText } from "./warnings";
import { setIsLoading, setSuggestedResponses } from "@/app/store/chatSlice";


const MAX_REQUESTS = 5;
const filterAndCheckUserInput = async (userInput) => {
 
    const filterModel = getGenerativeModel({ model: "gemini-pro" }); 
    const filterPromptResult = await filterPrompt(userInput)
    const filterResult = await generateContentWithRetry(filterModel, filterPromptResult, MAX_REQUESTS);
    const filteredResultText = await filterResult.response.text();
  
    if (isTextObjectionable(filteredResultText)) {
      console.warn(warningText);
      return null; 
    }
  
    return filteredResultText;
  }
  
  export const generateResponse = async (userInput, chatHistory,dispatch) => {
    if (!userInput.trim()) {
      throw new Error("User input cannot be empty");
    }
  
    const filteredResultText = await filterAndCheckUserInput(userInput);
  
    if (!filteredResultText) {
      setSuggestedResponses([""]);
      return; 
    }
  
    const model = getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = generatePrompt(userInput, chatHistory);
  
    try {
      await dispatch(setIsLoading(true))
      const result = await generateContentWithRetry(model, prompt, MAX_REQUESTS);
      await handleGeneratedResponse(result, userInput,dispatch);
      dispatch(setIsLoading(false))
    } catch (error) {
      console.error("Error generating response:", error);
      // Handle the error appropriately in your application
    }
  };
  
  
const handleGeneratedResponse = (result, userInput,dispatch) => {
  let botResponse = result?.response?.text();

  if (botResponse) {

    dispatch(setSuggestedResponses(parseSuggestions(botResponse)));
  } else {
    console.warn("No text was generated by the AI model.");
  }
};
