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
import { handleSignalPeerData, prepareNewWebRTCConnection, closeWebRTCConnection } from './webRTC';

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

  socket = io(import.meta.env.VITE_SOCKET_BASE_URL, {
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
    store.dispatch(setConnectionStatus('connecting'));
  });

  socket.on('reconnect', (attemptNumber) => {
    store.dispatch(setConnectionStatus('connected'));
  });

  socket.on('reconnect_error', (error) => {
    if (error.message === 'Authentication error') {
      handleAuthError();
      return;
    }
    store.dispatch(setConnectionStatus('disconnected'));
  });

  socket.on('reconnect_failed', () => {
    store.dispatch(setConnectionStatus('disconnected'));
  });

  socket.on('disconnect', () => {
    console.error('Disconnected from socket');
    store.dispatch(setConnectionStatus('disconnected'));
  });

  socket.on('friend:invitations', (data) => {
    const pendingInvitations = data;
    store.dispatch(setPendingInvitations(pendingInvitations));
  });

  socket.on('friend:sentInvitations', (data) => {
    const sentInvitations = data;
    store.dispatch(setSentInvitations(sentInvitations));
  });

  socket.on('friend:friendsList', (data) => {
    const friends = data;
    store.dispatch(setFriends(friends));
  });

  socket.on('friend:onlineFriends', (data) => {
    const friends = data;
    store.dispatch(setOnlineFriendsId(friends));
  });

  socket.on('friend:onlineFriendID', (data) => {
    const friendID = data;
    store.dispatch(addOnlineFriendId(friendID));
  });

  socket.on('chat:addedMessage', (data) => {
    store.dispatch(addMessageToChat(data));
  });

  socket.on('call:updateVoiceChannelParticipants', (data) => {
    store.dispatch(updateVoiceChannelParticipants(data));
  });

  socket.on('call:prepareWebRTCConnection', (data) => {
    prepareNewWebRTCConnection(data.userSocketId, false);

    socket.emit('call:initializeWebRTCConnection', {
      userSocketId: data.userSocketId,
    });
  });

  socket.on('call:initializeWebRTCConnection', (data) => {
    prepareNewWebRTCConnection(data.userSocketId, true);
  });

  socket.on('call:signalPeerData', (data) => {
    handleSignalPeerData(data);
  });

  socket.on('call:userLeftVoiceChannel', (data) => {
    closeWebRTCConnection(data.userSocketId);
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
};

export const joinServerVoiceChannel = (serverId) => {
  socket.emit('call:joinServerVoiceChannel', serverId);
};

export const leaveServerVoiceChannel = (serverId) => {
  socket.emit('call:leaveServerVoiceChannel', serverId);
};

export const signalPeerData = (data) => {
  socket.emit('call:signalPeerData', data);
};