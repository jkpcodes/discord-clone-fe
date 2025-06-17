import { ListItemButton, Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import AppAvatar from '../common/AppAvatar';
import ChatIcon from '@mui/icons-material/Chat';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const StyledListItem = styled(ListItemButton)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 60,
  paddingLeft: 24,
  paddingRight: 24,
  flexGrow: 0,

  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const onFocusHandler = (event) => {
  event.stopPropagation();
};

const FriendListItem = ({ friend, mode = 'online' }) => {

  let firstBtnActionHandler;
  let secondBtnActionHandler;

  const onListItemClick = () => {
  };

  const onActionClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  let actions =
    mode === 'online' || mode === 'all' ? (
      <>
        <IconButton
          variant='contained'
          color='primary'
          onFocus={onFocusHandler}
          onClick={firstBtnActionHandler}
        >
          <ChatIcon />
        </IconButton>
      </>
    ) : (
      <>
        {mode === 'pending' && (
          <IconButton
            variant='contained'
            color='success'
            onFocus={onFocusHandler}
            onClick={firstBtnActionHandler}
          >
            <CheckIcon />
          </IconButton>
        )}
        <IconButton
          variant='contained'
          color='error'
          onFocus={onFocusHandler}
          onClick={secondBtnActionHandler}
        >
          <CloseIcon />
        </IconButton>
      </>
    );
  return (
    <StyledListItem onClick={onListItemClick} disableRipple>
      <AppAvatar _id={friend._id} name={friend.username} size={40} showName />
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        {actions}
      </Box>
    </StyledListItem>
  );
};

export default FriendListItem;
