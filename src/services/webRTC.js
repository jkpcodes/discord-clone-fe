import store from '../store';
import { addRemoteStream, setDevices, removeRemoteStream } from '../store/callSlice';
import Peer from 'simple-peer';
import { getSocket, signalPeerData } from './socket';

const getConfig = () => {
  const turnIceServers = null;

  if (turnIceServers) {
    // TODO use TURN server credentials (this step is needed if we want to be able to connect to users behind NAT)
    // Note: use Metered (metered.ca) for TURN server
  } else {
    console.warn('Using only STUN servers');
    return {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
      ],
    }
  }
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

export const getLocalStreamPreview = (onlyAudio = false, callback) => {
  const constraints = onlyAudio ? onlyAudioContraints : defaultContraints;

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      getDevices();
      setLocalStream(stream);
      callback();
    })
    .catch((error) => {
      console.error('Cannot get local stream preview: ', error);
    });
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

  audioTracks.forEach(track => {
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

  videoTracks.forEach(track => {
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
      tracks.forEach(track => {
        track.stop();
      });

      // Remove all tracks from the stream
      tracks.forEach(track => {
        localStream.removeTrack(track);
      });

      // Set stream to null
      localStream = null;

      // Force browser to release devices by requesting and immediately stopping a dummy stream
      try {
        const dummyStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true
        });

        // Immediately stop the dummy stream
        dummyStream.getTracks().forEach(track => {
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
      userSocketId
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
  Object.keys(peerConnections).forEach(userSocketId => {
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
