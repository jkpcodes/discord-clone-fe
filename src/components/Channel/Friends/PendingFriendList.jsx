import { List, ListItem, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { Tooltip, IconButton } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { setAlert } from '../../../store/alertSlice';
import { useDispatch } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {
  acceptFriendInvitation,
  rejectFriendInvitation,
} from '../../../services/friends';
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
 * PendingFriendList component
 *
 * @returns
 */
const PendingFriendList = () => {
  const dispatch = useDispatch();
  const { pendingInvitations, sentInvitations } = useSelector(
    (state) => state.friend
  );

  let pendingList = pendingInvitations.map((sender) => sender.senderId);
  let sentList = sentInvitations.map((sender) => sender.receiverId);

  const acceptFriendMutation = useMutation({
    mutationFn: acceptFriendInvitation,
    onSuccess: (data) => {
      dispatch(
        setAlert({
          open: true,
          message: 'Friend invitation accepted successfully',
          severity: 'success',
        })
      );
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const rejectInvitationMutation = useMutation({
    mutationFn: rejectFriendInvitation,
    onSuccess: (data) => {
      dispatch(
        setAlert({
          open: true,
          message: 'Removed friend request/invitation',
          severity: 'success',
        })
      );
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const disableActions =
    acceptFriendMutation.isPending || rejectInvitationMutation.isPending;

  const handleAcceptFriend = (event, invitationId) => {
    event.stopPropagation();
    event.preventDefault();
    acceptFriendMutation.mutate({ id: invitationId });
  };

  const handleRejectFriend = (event, invitationId) => {
    event.stopPropagation();
    event.preventDefault();
    rejectInvitationMutation.mutate({ id: invitationId });
  };

  return (
    <StyledList>
      <StyledListItem>
        <Typography variant='h6'>Pending - {pendingList.length}</Typography>
      </StyledListItem>
      {pendingList.map((friend, index) => (
        <FriendListItem
          key={friend._id}
          friend={friend}
          actions={
            <>
              <Tooltip title='Accept'>
                <IconButton
                  variant='contained'
                  color='success'
                  onClick={(event) =>
                    handleAcceptFriend(event, pendingInvitations[index]._id)
                  }
                >
                  <CheckIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title='Reject'>
                <IconButton
                  variant='contained'
                  color='error'
                  onClick={(event) =>
                    handleRejectFriend(event, pendingInvitations[index]._id)
                  }
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </>
          }
          disabled={disableActions}
        />
      ))}
      <StyledListItem>
        <Typography variant='h6'>Sent - {sentList.length}</Typography>
      </StyledListItem>
      {sentList.map((friend, index) => (
        <FriendListItem
          key={friend._id}
          friend={friend}
          actions={
            <>
              <Tooltip title='Cancel'>
                <IconButton
                  variant='contained'
                  color='error'
                  onClick={() => handleRejectFriend(sentInvitations[index]._id)}
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </>
          }
          disabled={disableActions}
        />
      ))}
    </StyledList>
  );
};

export default PendingFriendList;
