import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  directChat: {}, // Key will consist of <userId>:<friendId> (Note: these values can interchange based on sort value of userId and friendId)
  serverChat: {}, // Will use server '_id' as key
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    /**
     * @param {*} action.payload { friendId, userId, _id (conversationId), messages, participants, pagination }
     */
    setFriendChat: (state, action) => {
      const chatKey = generateChatKey(
        action.payload.userId,
        action.payload.friendId
      );

      const sortedMessages = [...(action.payload.messages || [])].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );

      state.directChat = {
        ...state.directChat,
        [chatKey]: {
          _id: action.payload._id,
          messages: sortedMessages || [],
          participants: action.payload.participants || [],
          pagination: action.payload.pagination,
        },
      };
    },
    /**
     *
     * @param {*} state
     * @param {*} action.payload { conversationId, participantIds[], message }
     */
    addMessageToChat: (state, action) => {
      const chatKey = generateChatKey(
        action.payload.participantIds[0],
        action.payload.participantIds[1]
      );
      if (state.directChat[chatKey]) {
        const message = {
          ...action.payload.message,
          senderId: state.directChat[chatKey].participants.find(
            (participant) => participant._id === action.payload.message.senderId
          ),
        };

        state.directChat = {
          ...state.directChat,
          [chatKey]: {
            ...state.directChat[chatKey],
            messages: [...state.directChat[chatKey].messages, message],
          },
        };
      }
    },
    loadMoreMessages: (state, action) => {
      const chatKey = generateChatKey(
        action.payload.participantIds[0],
        action.payload.participantIds[1]
      );

      const sortedMessages = [...(action.payload.messages || [])].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );

      const conversationData = state.directChat[chatKey];

      state.directChat = {
        ...state.directChat,
        [chatKey]: {
          ...conversationData,
          messages: [...sortedMessages, ...conversationData.messages],
          pagination: action.payload.pagination,
        },
      };
    },
    resetChatState: (state) => {
      state.directChat = {};
      state.serverChat = {};
    },
  },
});

export const {
  setFriendChat,
  addMessageToChat,
  loadMoreMessages,
  resetChatState,
} = chatSlice.actions;
export default chatSlice.reducer;

export const generateChatKey = (userId, friendId) => {
  return userId.localeCompare(friendId) < 0
    ? `${userId}:${friendId}`
    : `${friendId}:${userId}`;
};
