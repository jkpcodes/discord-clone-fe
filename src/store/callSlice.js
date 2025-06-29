import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUserInCall: false,
  isCameraOn: false,
  isScreenShareOn: false,
  isMicrophoneOn: false,
  serverId: null, // Server ID of the server in the call (if connected to avoice channel)
  userId: null, // User ID of the user in the call (if direct call)
  localStream: null,
  remoteStreams: [],
  audioInputDevices: [],
  audioOutputDevices: [],
  videoInputDevices: [],
  audioInputDeviceId: null,
  audioOutputDeviceId: null,
  videoInputDeviceId: null,
};

const callSlice = createSlice({
  name: 'call',
  initialState,
  reducers: {
    /**
     * 
     * @param {*} state
     * @param {*} action.payload { isUserInCall, serverId }
     */
    setIsUserInCall: (state, action) => {
      state.isUserInCall = action.payload.isUserInCall;
      state.serverId = action.payload.serverId;
      state.isMicrophoneOn = true;
      state.isCameraOn = true;
      state.remoteStreams = [];
    },
    endCall: (state) => {
      state.isUserInCall = false;
      state.serverId = null;
      state.isCameraOn = false;
      state.isScreenShareOn = false;
      state.isMicrophoneOn = false;
      state.audioInputDevices = [];
      state.audioOutputDevices = [];
      state.videoInputDevices = [];
      state.remoteStreams = [];
    },
    setIsCameraOn: (state, action) => {
      state.isCameraOn = action.payload;
    },
    setIsScreenShareOn: (state, action) => {
      state.isScreenShareOn = action.payload;
    },
    setIsMicrophoneOn: (state, action) => {
      state.isMicrophoneOn = action.payload;
    },
    setParticipants: (state, action) => {
      state.participants = action.payload;
    },
    resetCallState: (state) => {
      state.isUserInCall = false;
      state.isCameraOn = false;
      state.isScreenShareOn = false;
      state.isMicrophoneOn = false;
      state.serverId = null;
      state.userId = null;
      state.localStream = null;
      state.audioInputDevices = [];
      state.audioOutputDevices = [];
      state.videoInputDevices = [];
      state.remoteStreams = [];
    },
    setDevices: (state, action) => {
      state.audioInputDevices = action.payload.audioInputDevices;
      state.audioOutputDevices = action.payload.audioOutputDevices;
      state.videoInputDevices = action.payload.videoInputDevices;

      if (action.payload.videoInputDevices.length > 0) {
        state.videoInputDeviceId = action.payload.videoInputDevices[0].deviceId;
      }
      if (action.payload.audioOutputDevices.length > 0) {
        state.audioOutputDeviceId =
          action.payload.audioOutputDevices[0].deviceId;
      }
      if (action.payload.audioInputDevices.length > 0) {
        state.audioInputDeviceId = action.payload.audioInputDevices[0].deviceId;
      }
    },
    addRemoteStream: (state, action) => {
      state.remoteStreams.push(action.payload);
    },
    removeRemoteStream: (state, action) => {
      state.remoteStreams = state.remoteStreams.filter(
        (stream) => stream.userSocketId !== action.payload
      );
    },
  },
});

export const {
  setIsUserInCall,
  endCall,
  setIsCameraOn,
  setIsScreenShareOn,
  setIsMicrophoneOn,
  resetCallState,
  setDevices,
  addRemoteStream,
  removeRemoteStream,
} = callSlice.actions;
export default callSlice.reducer;
