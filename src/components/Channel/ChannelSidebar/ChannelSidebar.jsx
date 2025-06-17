import { Drawer, List, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

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
  return (
    <StyledDrawer variant="permanent" anchor="left">
      <Typography variant="h6">Direct Messages</Typography>
      <List>
        
      </List>
    </StyledDrawer>
  );
}
 
export default ChannelSidebar;