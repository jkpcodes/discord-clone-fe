import { createSlice } from '@reduxjs/toolkit';
import { disconnectSocket } from '../services/socket';

const userDetailsString = localStorage.getItem('userDetails');
let userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;

const initialState = {
  userDetails,
  isLoggedIn: !!localStorage.getItem('userDetails'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Called on login/register success where we get user details and Json Web Token as response
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('userDetails', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userDetails = null;
      state.isLoggedIn = false;
      localStorage.removeItem('userDetails');
      disconnectSocket(); // Disconnect socket on logout
    },
  },
});

export const { logout, setUserDetails } = authSlice.actions;
export default authSlice.reducer;
