import { ListItemButton, Box, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import AppAvatar from '../../common/AppAvatar';
import ChatIcon from '@mui/icons-material/Chat';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {
  acceptFriendInvitation,
  rejectFriendInvitation,
} from '../../../services/friends';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../../store/alertSlice';
import { useMutation } from '@tanstack/react-query';

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

const FriendListItem = ({
  friend,
  actions,
  onListItemClick = null,
  disabled,
}) => {
  return (
    <StyledListItem onClick={onListItemClick} disableRipple disabled={disabled}>
      <AppAvatar _id={friend._id} name={friend.username} size={40} showName />
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        {actions}
      </Box>
    </StyledListItem>
  );
};

export default FriendListItem;
