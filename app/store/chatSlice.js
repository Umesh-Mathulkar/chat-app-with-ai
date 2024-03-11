import { createSlice, configureStore } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    user: null,
    allUsers:null,
    chatHistory: [],
    suggestedResponses: [],
    selectedResponse: "",
    chatRoomId: "",
    isLoading: false,
    receiver: '',
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    addChatMessage: (state, action) => {
      state.chatHistory.push(action.payload);
    },
    setChatHistory: (state, action) => {
      state.chatHistory = action.payload;
    },
    setSuggestedResponses: (state, action) => {
      state.suggestedResponses = action.payload;
    },
    setSelectedResponse: (state, action) => {
      state.selectedResponse = action.payload;
    },
    setChatRoomId: (state, action) => {
      state.chatRoomId = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setReceiver: (state, action) => {
      state.receiver = action.payload;
    },
    clearChats: (state) => {
      state.chatHistory = [];
    }
  },
});

export const { 
  setUser, 
  setAllUsers,
  setChatHistory, 
  setSuggestedResponses, 
  setSelectedResponse, 
  setChatRoomId, 
  setIsLoading, 
  setReceiver ,
  addChatMessage,
  clearChats
} = chatSlice.actions;

export default chatSlice.reducer;
