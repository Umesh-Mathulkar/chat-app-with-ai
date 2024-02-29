// chatParser.js
export const parseSuggestions = (responseText, maxSuggestions) => {
    const regex = /^\d+\.\s+(.*?)(?:\s*<br\s*\/?>\s*|$)/gm; 
    const matches = responseText.matchAll(regex);
    const suggestions = [];
  
    for (const match of matches) {
      if (suggestions.length >= maxSuggestions) break; 
      let suggestion = match[1].replace(/\s*<br\s*\/?>\s*/g, ' ').trim(); 
      suggestion = suggestion.replace(/^(["'])(.*)\1$/, '$2'); // Remove quotes
  
      suggestions.push(suggestion); 
    }
  
    return suggestions;
  };
  