import { io } from 'socket.io-client';
import store from '../store';
import { setConnectionStatus } from '../store/socket';
import {
  setFriends,
  setOnlineFriendsId,
  addOnlineFriendId,
  setPendingInvitations,
  setSentInvitations,
} from '../store/friendSlice';
import { addMessageToChat } from '../store/chatSlice';
import { updateVoiceChannelParticipants } from '../store/serverSlice';
import { logoutHandler } from './auth';

let socket = null;
export const getSocket = () => socket;

/**
 * Connect to the socket server
 *
 * @param {*} token user authentication token stored in local storage
 */
export const connectToSocket = (token) => {
  const { instanceId, connectionStatus } = store.getState().socket;

  if (socket && socket.connected) {
    return;
  }

  if (connectionStatus !== 'disconnected') {
    return;
  }

  socket = io('http://localhost:3000', {
    auth: {
      token,
      instanceId,
    },
    // Reconnection options
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
  });

  store.dispatch(setConnectionStatus('connecting'));

  socket.on('connect', () => {
    store.dispatch(setConnectionStatus('connected'));
  });

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error.message);
    if (error.message === 'Authentication error') {
      handleAuthError();
      return;
    }
    store.dispatch(setConnectionStatus('disconnected'));
  });

  socket.on('reconnect_attempt', (attemptNumber) => {
    console.log(`Attempting to reconnect (${attemptNumber})`);
    store.dispatch(setConnectionStatus('connecting'));
  });

  socket.on('reconnect', (attemptNumber) => {
    console.log(`Reconnected after ${attemptNumber} attempts`);
    store.dispatch(setConnectionStatus('connected'));
  });

  socket.on('reconnect_error', (error) => {
    console.error('Reconnection error:', error);
    if (error.message === 'Authentication error') {
      handleAuthError();
      return;
    }
    store.dispatch(setConnectionStatus('disconnected'));
  });

  socket.on('reconnect_failed', () => {
    console.error('Failed to reconnect');
    store.dispatch(setConnectionStatus('disconnected'));
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from socket');
    store.dispatch(setConnectionStatus('disconnected'));
  });

  socket.on('friend:invitations', (data) => {
    const pendingInvitations = data;
    console.log('Pending invitations', pendingInvitations);
    store.dispatch(setPendingInvitations(pendingInvitations));
  });

  socket.on('friend:sentInvitations', (data) => {
    const sentInvitations = data;
    console.log('Sent invitations', sentInvitations);
    store.dispatch(setSentInvitations(sentInvitations));
  });

  socket.on('friend:friendsList', (data) => {
    const friends = data;
    console.log('Friends list', friends);
    store.dispatch(setFriends(friends));
  });

  socket.on('friend:onlineFriends', (data) => {
    const friends = data;
    store.dispatch(setOnlineFriendsId(friends));
  });

  socket.on('friend:onlineFriendID', (data) => {
    const friendID = data;
    console.log('Online friend ID', friendID);
    store.dispatch(addOnlineFriendId(friendID));
  });

  socket.on('chat:addedMessage', (data) => {
    console.log('chat:addedMessage: ', data);
    store.dispatch(addMessageToChat(data));
  });

  socket.on('call:updateVoiceChannelParticipants', (data) => {
    store.dispatch(updateVoiceChannelParticipants(data));
  });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;

    // // Dispatch state updates after socket is disconnected
    setTimeout(() => {
      store.dispatch(setConnectionStatus('disconnected'));
    }, 0);
  }
};

const handleAuthError = () => {
  disconnectSocket();
  // Logout the user
  store.dispatch(setConnectionStatus('disconnected'));
  logoutHandler();
}

export const joinServerVoiceChannel = (serverId) => {
  socket.emit('call:joinServerVoiceChannel', serverId);
}

export const leaveServerVoiceChannel = (serverId) => {
  socket.emit('call:leaveServerVoiceChannel', serverId);
}