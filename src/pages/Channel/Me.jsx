import ChannelLayout from '../../components/common/ChannelLayout';
import FriendSubTab from '../../components/Channel/Friends/FriendSubTab';
import { Box } from '@mui/material';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import OnlineFriendsList from '../../components/Channel/Friends/OnlineFriendList';
import PendingFriendList from '../../components/Channel/Friends/PendingFriendList';

const MePageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  overflowY: 'auto',
  boxSizing: 'border-box',

  // Custom scrollbar styling
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#40444b',
    borderRadius: '4px',
    // border: "5px solid transparent",
    backgroundClip: 'padding-box',
    '&:hover': {
      background: '#4f545c',
      backgroundClip: 'padding-box',
    },
  },

  scrollbarWidth: 'thin',
  scrollbarColor: '#40444b transparent',
}));

const MePage = () => {
  // Tab values: 'online', 'all', 'pending'
  const [tabValue, setTabValue] = useState('online');

  return (
    <ChannelLayout
      enableHeader={true}
      headerContent={
        <FriendSubTab tabValue={tabValue} setTabValue={setTabValue} />
      }
    >
      <MePageContainer>
        {(tabValue === 'online' || tabValue === 'all') && (
          <OnlineFriendsList mode={tabValue} />
        )}
        {tabValue === 'pending' && <PendingFriendList mode={tabValue} />}
      </MePageContainer>
    </ChannelLayout>
  );
};

export default MePage;
