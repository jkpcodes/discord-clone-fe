import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import CallEndIcon from '@mui/icons-material/CallEnd';
import { Box, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { leaveServerVoiceChannel } from '../../services/socket';
import {
  setMicrophoneState,
  setCameraState,
  stopLocalStream,
  closeAllWebRTCConnections,
} from '../../services/webRTC';
import {
  setIsCameraOn,
  setIsScreenShareOn,
  setIsMicrophoneOn,
  endCall,
} from '../../store/callSlice';
import { exitUserFromAllVoiceChannels } from '../../store/serverSlice';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'absolute',
  bottom: 10,
  width: '100%',
}));

const CallWindowActions = ({ isFullScreen, handleScreenSize }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isCameraOn, isScreenShareOn, isMicrophoneOn } = useSelector(
    (state) => state.call
  );
  const { userDetails } = useSelector((state) => state.auth);

  useEffect(() => {
    setMicrophoneState(isMicrophoneOn);
  }, [isMicrophoneOn]);

  useEffect(() => {
    setCameraState(isCameraOn);
  }, [isCameraOn]);

  const handleCamera = () => {
    dispatch(setIsCameraOn(!isCameraOn));
  };

  const handleScreenShare = () => {
    dispatch(setIsScreenShareOn(!isScreenShareOn));
  };

  const handleMicrophone = () => {
    dispatch(setIsMicrophoneOn(!isMicrophoneOn));
  };

  const handleEndCall = () => {
    dispatch(endCall());
    dispatch(exitUserFromAllVoiceChannels(userDetails._id));
    leaveServerVoiceChannel(id);
    stopLocalStream();
    closeAllWebRTCConnections();
  };

  return (
    <StyledBox>
      <Box
        sx={{
          width: '30%',
        }}
      ></Box>
      <Box
        sx={{ width: '30%', display: 'flex', justifyContent: 'center', gap: 1 }}
      >
        <Tooltip title={isMicrophoneOn ? 'Mute' : 'Unmute'} placement='top'>
          <IconButton onClick={handleMicrophone}>
            {isMicrophoneOn ? <MicIcon /> : <MicOffIcon color='error' />}
          </IconButton>
        </Tooltip>
        <Tooltip
          title={isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
          placement='top'
        >
          <IconButton onClick={handleCamera}>
            {isCameraOn ? (
              <VideocamIcon color='success' />
            ) : (
              <VideocamOffIcon color='error' />
            )}
          </IconButton>
        </Tooltip>
        {/* <Tooltip
          title={isScreenShareOn ? 'Stop Screen Share' : 'Start Screen Share'}
          placement='top'
        >
          <IconButton onClick={handleScreenShare}>
            {isScreenShareOn ? <StopScreenShareIcon /> : <ScreenShareIcon />}
          </IconButton>
        </Tooltip> */}
        <Tooltip title='End Call' placement='top'>
          <IconButton onClick={handleEndCall}>
            <CallEndIcon color='error' />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        sx={{
          width: '30%',
          display: 'flex',
          justifyContent: 'flex-end',
          paddingRight: 1,
          boxSizing: 'border-box',
        }}
      >
        <Tooltip
          title={isFullScreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          placement='top'
        >
          <IconButton onClick={handleScreenSize}>
            {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
        </Tooltip>
      </Box>
    </StyledBox>
  );
};

export default CallWindowActions;
