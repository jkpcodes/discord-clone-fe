import PeopleIcon from '@mui/icons-material/People';
import { styled } from '@mui/material/styles';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  ListItemButton,
  Button,
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import InviteFriendDialog from './InviteFriendDialog';
import { useState } from 'react';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: 60,
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  height: 60,
}));

const FriendSubTab = ({ tabValue, setTabValue }) => {
  const [addFriendDialogOpen, setAddFriendDialogOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddFriend = () => {
    setAddFriendDialogOpen(true);
  };

  return (
    <StyledBox>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1,
          marginRight: 2,
        }}
      >
        <PeopleIcon />
        <Typography variant='h7'>Friends</Typography>
        <FiberManualRecordIcon sx={{ fontSize: 10 }} />
      </Box>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        aria-label='Tabs where each tab needs to be selected manually'
      >
        <StyledTab label='Online' component={ListItemButton} value={'online'} />
        <StyledTab label='All' component={ListItemButton} value={'all'} />
        <StyledTab
          label='Pending'
          component={ListItemButton}
          value={'pending'}
        />
      </Tabs>
      <Button
        variant='contained'
        color='primary'
        startIcon={<PersonAddIcon />}
        sx={{ marginLeft: 4 }}
        onClick={handleAddFriend}
      >
        Add Friend
      </Button>
      <InviteFriendDialog
        open={addFriendDialogOpen}
        onClose={() => setAddFriendDialogOpen(false)}
      />
    </StyledBox>
  );
};

export default FriendSubTab;
