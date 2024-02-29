// chatUtils.js
export const isTextObjectionable = (text) => {
    const regex = /\byes\b/i; // Match standalone "yes"
    return regex.test(text);
  };
  