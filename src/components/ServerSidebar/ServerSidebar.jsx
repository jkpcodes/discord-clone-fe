import { Drawer, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import ServerAvatar from './ServerAvatar';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 72,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  boxSizing: 'border-box',

  '& > .MuiDrawer-paper': {
    width: 72,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    position: 'absolute',
    overflowX: 'hidden',
    overflowY: 'auto',
    boxSizing: 'border-box',
    alignItems: 'center',
  }
}));

const ServerSidebar = () => {
  const theme = useTheme();

  return (
    <StyledDrawer variant="permanent" anchor="left">
      <ServerAvatar _id="1" name="Direct Messages" color={theme.palette.primary.main} />
    </StyledDrawer>
  );
}
 
export default ServerSidebar;