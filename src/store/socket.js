import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  instanceId: uuidv4(),
  connectionStatus: 'disconnected',
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setConnectionStatus: (state, action) => {
      state.connectionStatus = action.payload;
    },
  },
});

export const {
  setIsConnected,
  setConnectionStatus,
} = socketSlice.actions;
export default socketSlice.reducer;
