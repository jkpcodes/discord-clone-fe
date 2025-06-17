import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import socketReducer from './socket';
import friendReducer from './friendSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    socket: socketReducer,
    friend: friendReducer,
  },
});

export default store;
