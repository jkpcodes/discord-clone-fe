import ChannelLayout from '../../components/common/ChannelLayout';
import FriendSubTab from '../../components/Channel/FriendSubTab';
import FriendsList from '../../components/Channel/FriendsList';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';

const MePageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  overflowY: 'auto',
  // paddingLeft: 24,
  // paddingRight: 24,
  // paddingBottom: 24,
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
  const { friends, pendingInvitations, sentInvitations, onlineFriends } =
    useSelector((state) => state.friend);
  // Tab values: 'online', 'all', 'pending'
  const [tabValue, setTabValue] = useState('online');

  let headerText1;
  let headerText2;
  let friendsList1;
  let friendsList2;
  if (tabValue === 'online') {
    headerText1 = 'Online';
    friendsList1 = onlineFriends;
  } else if (tabValue === 'all') {
    headerText1 = 'Friends';
    friendsList1 = friends;
  } else if (tabValue === 'pending') {
    headerText1 = 'Received';
    friendsList1 = pendingInvitations.map((sender) => sender.senderId);
    headerText2 = 'Sent';
    friendsList2 = sentInvitations.map((sender) => sender.receiverId);
  }


  return (
    <ChannelLayout
      enableHeader={true}
      headerContent={
        <FriendSubTab tabValue={tabValue} setTabValue={setTabValue} />
      }
    >
      {/* TODO: Display the content of the selected tab */}
      <MePageContainer>
        <FriendsList
          headerText1={headerText1}
          friendsList1={friendsList1}
          headerText2={headerText2}
          friendsList2={friendsList2}
          mode={tabValue}
        />
      </MePageContainer>
    </ChannelLayout>
  );
};

export default MePage;
