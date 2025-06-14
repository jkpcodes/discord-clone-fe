import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import AppHeader from '../../components/AppHeader/AppHeader';
import ServerSidebar from '../../components/ServerSidebar/ServerSidebar';
import ChannelSidebar from '../../components/ChannelSidebar/ChannelSidebar';

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

const ChannelContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  margin: 0,
  padding: 0,
}));

const ChannelPage = () => {
  return (
    <>
      <AppHeader />
      <ChannelPageContainer>
        <SidebarContainer>
          <ServerSidebar />
          <ChannelSidebar />
        </SidebarContainer>
        <ChannelContainer>
          <Outlet />
        </ChannelContainer>
      </ChannelPageContainer>
    </>
  );
};

export default ChannelPage;
