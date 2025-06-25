import { Drawer, List, Divider } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import ServerAvatar from './ServerAvatar';
import PersonIcon from '@mui/icons-material/Person';
import { useLocation, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import CreateServerDialog from './CreateServerDialog';
import { useState } from 'react';
import { useSelector } from 'react-redux';

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
  },
}));

const ServerSidebar = () => {
  const [createServerDialogOpen, setCreateServerDialogOpen] = useState(false);
  const { servers } = useSelector((state) => state.server);
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const currentServerId = location.pathname.split('/')[2];

  const handleServerClick = (serverId) => {
    navigate(`/channel/${serverId}`, { replace: true });
  };

  const handleCreateServerDialogOpen = () => {
    setCreateServerDialogOpen(true);
  };

  const handleCreateServerDialogClose = () => {
    setCreateServerDialogOpen(false);
  };

  return (
    <>
      <StyledDrawer variant='permanent' anchor='left'>
        <List sx={{ paddingBottom: 0 }}>
          {/* Direct Messages */}
          <ServerAvatar
            _id='me'
            name='Direct Messages'
            color={theme.palette.primary.main}
            icon={<PersonIcon />}
            isSelected={currentServerId === 'me'}
            onClick={() => handleServerClick('me')}
          />
          <Divider />
        </List>
        <List sx={{ padding: 0 }}>
          <ServerAvatar
            _id='create-server'
            name='Create Server'
            color='#2f3136'
            icon={<AddIcon />}
            onClick={handleCreateServerDialogOpen}
          />
        </List>
        <List sx={{ paddingTop: 0 }}>
          {/* Servers */}
          {servers.map((server) => (
            <ServerAvatar
              key={server._id}
              _id={server._id}
              name={server.name}
              isSelected={currentServerId === server._id}
              onClick={() => handleServerClick(server._id)}
            />
          ))}
        </List>
      </StyledDrawer>
      <CreateServerDialog
        open={createServerDialogOpen}
        onClose={handleCreateServerDialogClose}
      />
    </>
  );
};

export default ServerSidebar;
