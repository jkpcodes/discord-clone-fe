import { createSlice } from '@reduxjs/toolkit';

const deriveOnlineFriends = (friends, onlineFriendsId) => {
  return friends.filter((friend) => onlineFriendsId.includes(friend._id));
};

const initialState = {
  friends: [],
  pendingInvitations: [],
  sentInvitations: [],
  onlineFriendsId: [],
  onlineFriends: [],
};

const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload;
      state.onlineFriends = deriveOnlineFriends(action.payload, state.onlineFriendsId);
    },
    setPendingInvitations: (state, action) => {
      state.pendingInvitations = action.payload;
    },
    setSentInvitations: (state, action) => {
      state.sentInvitations = action.payload;
    },
    setOnlineFriendsId: (state, action) => {
      state.onlineFriendsId = action.payload;
      state.onlineFriends = deriveOnlineFriends(state.friends, action.payload);
    },
    addOnlineFriendId: (state, action) => {
      // Check if friend is already in onlineFriendsId
      if (state.onlineFriendsId.includes(action.payload)) {
        return;
      }
      // Add friend to onlineFriendsId
      state.onlineFriendsId.push(action.payload);
      // Add friend to onlineFriends
      state.onlineFriends = deriveOnlineFriends(state.friends, state.onlineFriendsId);
    },
    removeOnlineFriend: (state, action) => {
      state.onlineFriends = state.onlineFriends.filter(
        (friend) => friend._id !== action.payload
      );
    },
    resetFriendState: (state) => {
      state.friends = [];
      state.pendingInvitations = [];
      state.sentInvitations = [];
      state.onlineFriendsId = [];
      state.onlineFriends = [];
    },
  },
});

export const {
  setFriends,
  setPendingInvitations,
  setSentInvitations,
  setOnlineFriendsId,
  addOnlineFriendId,
  removeOnlineFriend,
  resetFriendState,
} = friendSlice.actions;
export default friendSlice.reducer;
