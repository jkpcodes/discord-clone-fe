import apiClient from "./api";
import store from "../store";
import { logout } from "../store/authSlice";
import { resetFriendState } from "../store/friendSlice";
import { setConnectionStatus } from "../store/socket";
import { resetChatState } from "../store/chatSlice";
import { resetServerState } from "../store/serverSlice";
import { resetCallState } from "../store/callSlice";

export const register = async ({username, email, password}) => {
  try {
    const response = await apiClient.post("/auth/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async ({email, password}) => {
  try {
    const response = await apiClient.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export const logoutHandler = () => {
  console.log('logoutHandler');
  store.dispatch(logout());
  store.dispatch(resetCallState());
  store.dispatch(resetChatState());
  store.dispatch(resetFriendState());
  store.dispatch(resetServerState());
  store.dispatch(setConnectionStatus('disconnected'));
}