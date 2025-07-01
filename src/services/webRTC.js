import store from '../store';
import {
  addRemoteStream,
  setDevices,
  removeRemoteStream,
} from '../store/callSlice';
import Peer from 'simple-peer';
import { getSocket, signalPeerData } from './socket';
import { setAlert } from '../store/alertSlice';

const METERED_USERNAME = import.meta.env.VITE_METERED_USERNAME;
const METERED_CREDENTIAL = import.meta.env.VITE_METERED_CREDENTIAL;

const getConfig = async () => {
  const iceServers = [
    { urls: 'stun:stun.relay.metered.ca:80' },
  ];

  const meteredURLs = [
    'turn:standard.relay.metered.ca:80',
    'turn:standard.relay.metered.ca:80?transport=tcp',
    'turn:standard.relay.metered.ca:443',
    'turns:standard.relay.metered.ca:443?transport=tcp',
  ];

  meteredURLs.forEach((url) => {
    iceServers.push({
      urls: url,
      credential: METERED_CREDENTIAL,
      username: METERED_USERNAME,
    });
  });

  return {
    iceServers,
  };
};

const onlyAudioContraints = {
  audio: true,
  video: false,
};

const defaultContraints = {
  audio: true,
  video: true,
};

let localStream = null;
let peerConnections = {};

export const getLocalStream = () => {
  return localStream;
};

export const setLocalStream = (stream) => {
  localStream = stream;
};

// export const getLocalStreamPreview = (onlyAudio = false, callback) => {
//   const constraints = onlyAudio ? onlyAudioContraints : defaultContraints;

//   navigator.mediaDevices
//     .getUserMedia(constraints)
//     .then((stream) => {
//       getDevices();
//       setLocalStream(stream);
//       callback();
//     })
//     .catch((error) => {
//       console.error('Cannot get local stream preview: ', error);
//     });
// };

export const getLocalStreamPreview = async (onlyAudio = false, callback) => {
  try {
    // First, check what devices are available
    const devices = await navigator.mediaDevices.enumerateDevices();
    const hasAudioInput = devices.some(device => device.kind === 'audioinput');
    const hasVideoInput = devices.some(device => device.kind === 'videoinput');

    // If user doesn't have a microphone, show error and return
    if (!hasAudioInput) {
      store.dispatch(setAlert({
        open: true,
        message: 'Must have a microphone in order to join a Voice Channel',
        severity: 'error'
      }));
      return;
    }

    // Determine constraints based on available devices
    let constraints = {
      audio: hasAudioInput,
      video: hasVideoInput,
    };

    // Try to get the stream with determined constraints
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    
    // Update devices list
    getDevices();
    setLocalStream(stream);

    // Execute callback function to enter voice channel
    callback();

  } catch (error) {
    console.error('Error getting local stream preview:', error);
    
    // Handle specific error cases
    if (error.name === 'NotAllowedError') {
      store.dispatch(setAlert({
        open: true,
        message: 'Please allow microphone and camera permissions to join the call',
        severity: 'error'
      }));
    } else if (error.name === 'NotFoundError') {
      store.dispatch(setAlert({
        open: true,
        message: 'Required media devices not found. Please check your microphone and camera.',
        severity: 'error'
      }));
    } else if (error.name === 'NotReadableError') {
      store.dispatch(setAlert({
        open: true,
        message: 'Media devices are already in use by another application',
        severity: 'error'
      }));
    } else {
      store.dispatch(setAlert({
        open: true,
        message: 'Failed to access media devices. Please check your permissions and try again.',
        severity: 'error'
      }));
    }
  }
};

const getDevices = () => {
  navigator.mediaDevices.enumerateDevices().then((devices) => {
    let audioInputDevices = [];
    let audioOutputDevices = [];
    let videoInputDevices = [];

    devices.forEach((device) => {
      // Extract only serializable properties
      const deviceInfo = {
        deviceId: device.deviceId,
        kind: device.kind,
        label: device.label,
        groupId: device.groupId,
      };

      if (device.kind === 'audioinput') {
        audioInputDevices.push(deviceInfo);
      }
      if (device.kind === 'audiooutput') {
        audioOutputDevices.push(deviceInfo);
      }
      if (device.kind === 'videoinput') {
        videoInputDevices.push(deviceInfo);
      }
    });

    store.dispatch(
      setDevices({ audioInputDevices, audioOutputDevices, videoInputDevices })
    );
  });
};

/**
 * Turn microphone on/off
 */
export const setMicrophoneState = (isMicrophoneOn) => {
  if (!localStream) {
    console.warn('No local stream available');
    return;
  }

  const audioTracks = localStream.getAudioTracks();
  if (audioTracks.length === 0) {
    console.warn('No audio tracks available');
    return;
  }

  audioTracks.forEach((track) => {
    track.enabled = isMicrophoneOn;
  });
};

/**
 * Turn camera on/off
 */
export const setCameraState = (isCameraOn) => {
  if (!localStream) {
    console.warn('No local stream available');
    return;
  }

  const videoTracks = localStream.getVideoTracks();
  if (videoTracks.length === 0) {
    console.warn('No video tracks available');
    return;
  }

  videoTracks.forEach((track) => {
    track.enabled = isCameraOn;
  });
};

/**
 * Stop and clean up the local stream
 */
export const stopLocalStream = async () => {
  if (localStream) {
    try {
      // Stop all tracks
      const tracks = localStream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });

      // Remove all tracks from the stream
      tracks.forEach((track) => {
        localStream.removeTrack(track);
      });

      // Set stream to null
      localStream = null;

      // Force browser to release devices by requesting and immediately stopping a dummy stream
      try {
        const dummyStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });

        // Immediately stop the dummy stream
        dummyStream.getTracks().forEach((track) => {
          track.stop();
        });
      } catch (dummyError) {
        // Ignore errors from dummy stream request
        console.log('Dummy stream cleanup completed');
      }
    } catch (error) {
      console.error('Error stopping local stream:', error);
    }
  }
};

export const prepareNewWebRTCConnection = (userSocketId, isInitiator) => {
  peerConnections[userSocketId] = new Peer({
    initiator: isInitiator,
    config: getConfig(),
    stream: localStream,
  });

  peerConnections[userSocketId].on('signal', (data) => {
    const signalData = {
      signal: data,
      userSocketId,
    };

    signalPeerData(signalData);
  });

  peerConnections[userSocketId].on('stream', (remoteStream) => {
    remoteStream.userSocketId = userSocketId;
    store.dispatch(addRemoteStream(remoteStream));
  });
};

export const handleSignalPeerData = (data) => {
  const { signal, userSocketId } = data;

  if (peerConnections[userSocketId]) {
    peerConnections[userSocketId].signal(signal);
  }
};

export const closeAllWebRTCConnections = () => {
  Object.keys(peerConnections).forEach((userSocketId) => {
    peerConnections[userSocketId].destroy();
  });
  peerConnections = {};
  // Close local stream
  stopLocalStream();
};

export const closeWebRTCConnection = (userSocketId) => {
  if (peerConnections[userSocketId]) {
    peerConnections[userSocketId].destroy();
    delete peerConnections[userSocketId];
  }

  store.dispatch(removeRemoteStream(userSocketId));
};
