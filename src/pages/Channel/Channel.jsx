import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import AppHeader from '../../components/AppHeader/AppHeader';
import ServerSidebar from '../../components/Server/ServerSidebar/ServerSidebar';
import ChannelSidebar from '../../components/Channel/ChannelSidebar/ChannelSidebar';
import Socket from '../../components/utils/Socket';
import CallWindow from '../../components/Call/CallWindow';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ChannelPageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexGrow: 1,
  position: 'absolute',
  height: 'calc(100% - 48px)',
  top: 48,
  left: 0,
  right: 0,
  bottom: 0,
  margin: 0,
  padding: 0,
}));

const SidebarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  width: 320,
  height: '100%',
  margin: 0,
  padding: 0,
}));

const ChannelPage = () => {
  const isUserInCall = useSelector((state) => state.call.isUserInCall);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/channel') {
      navigate('/channel/me', { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <Socket />
      <AppHeader />
      <ChannelPageContainer>
        <SidebarContainer>
          <ServerSidebar />
          <ChannelSidebar />
        </SidebarContainer>
        <Outlet />
      </ChannelPageContainer>
      {isUserInCall && <CallWindow />}
    </>
  );
};

export default ChannelPage;
