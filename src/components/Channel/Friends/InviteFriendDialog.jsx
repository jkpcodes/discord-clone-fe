import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { emailValidation } from '../../../utils/validators';
import { styled } from '@mui/material/styles';
import { useMutation } from '@tanstack/react-query';
import { sendFriendInvitation } from '../../../services/friends';
import { useDispatch } from 'react-redux';
import FormButton from '../../common/FormButton';
import { setAlert } from '../../../store/alertSlice';

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& > .MuiFormHelperText-root': {
    position: 'absolute',
    top: '48px',
    my: 0,
  },
  '& > .MuiInputBase-root > input': {
    padding: 14,
  },
}));

const InviteFriendDialog = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [addAttempt, setAddAttempt] = useState(0);
  const isValidEmail = emailValidation.validate(email);

  const inviteFriendMutation = useMutation({
    mutationFn: sendFriendInvitation,
    onSuccess: () => {
      dispatch(
        setAlert({
          open: true,
          message: 'Friend invitation sent successfully',
          severity: 'success',
        })
      );
      handleOnClose();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleAddFriend = () => {
    setAddAttempt((value) => value + 1);
    if (isValidEmail.error) {
      return;
    }

    inviteFriendMutation.mutate({
      email,
    });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOnClose = () => {
    setEmail('');
    setAddAttempt(0);
    onClose();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !inviteFriendMutation.isPending) {
      handleAddFriend();
    }
  };

  return (
    <Dialog open={open} onClose={handleOnClose}>
      <DialogTitle>Invite Friend</DialogTitle>
      <DialogContent sx={{ width: 480, paddingBottom: 0 }}>
        <DialogContentText sx={{ mb: 1 }}>
          Enter email address of the user you want to add
        </DialogContentText>
        <StyledTextField
          label='Email'
          fullWidth
          required
          onChange={handleEmailChange}
          onKeyDown={handleKeyDown}
          error={addAttempt > 0 && isValidEmail.error}
          disabled={inviteFriendMutation.isPending}
          helperText={addAttempt > 0 && isValidEmail.error?.message}
        />
      </DialogContent>
      <DialogActions sx={{ paddingLeft: 3, paddingRight: 3, paddingBottom: 2 }}>
        <FormButton
          onClick={handleOnClose}
          variant='contained'
          color='warning'
          height={40}
          fullWidth={false}
          disabled={inviteFriendMutation.isPending}
        >
          Cancel
        </FormButton>
        <FormButton
          onClick={handleAddFriend}
          variant='contained'
          color='primary'
          height={40}
          fullWidth={false}
          disabled={inviteFriendMutation.isPending}
          isLoading={inviteFriendMutation.isPending}
        >
          Invite
        </FormButton>
      </DialogActions>
    </Dialog>
  );
};

export default InviteFriendDialog;
