import { Box, IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { createPortal } from 'react-dom';
import CallWindowActions from './CallWindowActions';
import UserCallDisplay from './UserCallDisplay';
import { getLocalStream } from '../../services/webRTC';
import { useSelector } from 'react-redux';

const CallLayoutContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
  zIndex: theme.zIndex.modal + 1,
  boxSizing: 'border-box',
  paddingBottom: 60,
}));

const UserCallStreamContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
  backgroundColor: 'gray',
}));

const FullScreenStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  borderRadius: '0px',
};

const MiniScreenStyle = {
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: 500,
  height: 400,
};

const CallWindow = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { remoteStreams } = useSelector((state) => state.call);
  const localStream = getLocalStream();

  const resizeScreenHandler = () => {
    setIsFullScreen((prev) => !prev);
  };

  return createPortal(
    <CallLayoutContainer sx={isFullScreen ? FullScreenStyle : MiniScreenStyle}>
      <UserCallStreamContainer>
        <UserCallDisplay stream={localStream} isLocalStream={true} />
        {remoteStreams.map((stream) => (
          <UserCallDisplay key={stream.id} stream={stream} />
        ))}
      </UserCallStreamContainer>
      <CallWindowActions
        isFullScreen={isFullScreen}
        handleScreenSize={resizeScreenHandler}
      />
    </CallLayoutContainer>,
    document.getElementById('call-window')
  );
};

export default CallWindow;
