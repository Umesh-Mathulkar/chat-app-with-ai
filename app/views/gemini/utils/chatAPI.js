// chatAPI.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GENAI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const getGenerativeModel = (model) => {
  return genAI.getGenerativeModel(model);
};

export const generateContentWithRetry = async (model, prompt, maxAttempts) => {
  let result;
  let attempts = 0;

  while (!result && attempts < maxAttempts) {
    try {
      result = await model.generateContent(prompt);
    } catch (error) {
      if (error.message.includes('overloaded','No')) {
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 1000 * attempts)); 
      } else {
        throw error; 
      }
    }
  }
  
  return result;
};
