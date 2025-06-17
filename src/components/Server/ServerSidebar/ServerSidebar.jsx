import { Drawer, List, Divider } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import ServerAvatar from './ServerAvatar';
import PersonIcon from '@mui/icons-material/Person';
import { useLocation, useNavigate } from 'react-router-dom';

const DUMMY_SERVERS = [
  {
    _id: '65f1a2b3c4d5e6f7a8b9c0d1',
    name: 'Sample Server 1',
  },
  {
    _id: '75e2b3c4d5e6f7a8b9c0d2e3',
    name: 'Random Server 2',
  },
  {
    _id: '85d3c4d5e6f7a8b9c0d2e3f4',
    name: 'Hello Server 3',
  },
];

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
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const currentServerId = location.pathname.split('/')[2];

  const handleServerClick = (serverId) => {
    navigate(`/channel/${serverId}`, { replace: true });
  };

  return (
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
      <List sx={{ paddingTop: 0 }}>
        {/* Servers */}
        {DUMMY_SERVERS.map((server) => (
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
  );
};

export default ServerSidebar;
