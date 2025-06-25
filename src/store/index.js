import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import socketReducer from './socket';
import friendReducer from './friendSlice';
import alertReducer from './alertSlice';
import chatReducer from './chatSlice';
import serverReducer from './serverSlice';
import callReducer from './callSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
    socket: socketReducer,
    friend: friendReducer,
    chat: chatReducer,
    server: serverReducer,
    call: callReducer,
  },
});

export default store;
