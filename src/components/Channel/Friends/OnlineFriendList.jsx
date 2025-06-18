import { List, ListItem, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { Tooltip, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import FriendListItem from './FriendListItem';

const StyledList = styled(List)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  height: 60,
  paddingLeft: 24,
  paddingRight: 24,
}));

/**
 * FriendsList1 component
 *
 * @param {*} mode values: 'online', 'all'
 * @returns
 */
const OnlineFriendsList = ({ mode = 'online' }) => {
  const { friends, onlineFriends } =
    useSelector((state) => state.friend);

  let headerText;
  let friendList = [];

  if (mode === 'online') {
    headerText = 'Online';
    friendList = onlineFriends;
  } else {
    headerText = 'Friends';
    friendList = friends;
  }

  const actions = (
    <Tooltip title='Message'>
      <IconButton variant='contained' color='white'>
        <ChatIcon />
      </IconButton>
    </Tooltip>
  );

  return (
    <StyledList>
      <StyledListItem>
        <Typography variant='h6'>
          {headerText} - {friendList.length}
        </Typography>
      </StyledListItem>
      {friendList.map((friend, index) => (
        <FriendListItem
          key={friend._id}
          friend={friend}
          mode={mode}
          actions={actions}
        />
      ))}
    </StyledList>
  );
};

export default OnlineFriendsList;
