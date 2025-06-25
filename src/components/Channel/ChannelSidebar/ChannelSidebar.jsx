import { Drawer, List, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import VoiceChannel from './VoiceChannel';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 248,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  boxSizing: 'border-box',

  '& > .MuiDrawer-paper': {
    width: 248,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'center',
    left: 72,
    paddingTop: 12,
    position: 'absolute',
    overflowX: 'hidden',
    overflowY: 'auto',
    boxSizing: 'border-box',
  }
}));

const ChannelSidebar = () => {
  const location = useLocation();
  const isServerPage = !location.pathname.includes('/channel/me');

  return (
    <StyledDrawer variant="permanent" anchor="left">
      {/* TODO: if in Me page, display conversation list */}
      {!isServerPage && (
        <>
          <Typography variant="h6">Direct Messages</Typography>
          <List>
            
          </List>
        </>
      )}

      {/* TODO: if in Server page, display server voice channel and current users in voice channel */}
      {isServerPage && (
        <VoiceChannel />
      )}
    </StyledDrawer>
  );
}
 
export default ChannelSidebar;