import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createServer } from '../../../services/server';
import FormButton from '../../common/FormButton';
import SelectMembers from './SelectMembers';

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

const CreateServerDialog = ({ open, onClose }) => {
  const [serverName, setServerName] = useState('');
  const [members, setMembers] = useState([]);
  const [createServerAttempt, setCreateServerAttempt] = useState(0);
  const queryClient = useQueryClient();

  const handleServerNameChange = (event) => {
    setServerName(event.target.value);
  };

  const handleMembersChange = (value) => {
    const currentIndex = members.indexOf(value);
    const newMembers = [...members];

    if (currentIndex === -1) {
      newMembers.push(value);
    } else {
      newMembers.splice(currentIndex, 1);
    }

    setMembers(newMembers);
  };

  const createServerMutation = useMutation({
    mutationFn: createServer,
    onSuccess: () => {
      // Invalidate and refetch the servers query
      queryClient.invalidateQueries({ queryKey: ['servers'] });
      handleOnClose();
    },
  });

  const handleCreateServer = () => {
    if (serverName.length === 0 || members.length === 0) {
      setCreateServerAttempt(createServerAttempt + 1);
      return;
    }

    createServerMutation.mutate({ name: serverName, members });
  };

  const handleOnClose = () => {
    setServerName('');
    setMembers([]);
    setCreateServerAttempt(0);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Server</DialogTitle>
      <DialogContent sx={{ width: 520, boxSizing: 'border-box' }}>
        <DialogContentText sx={{ mb: 1 }}>
          Enter the name of the server you want to create
        </DialogContentText>
        <StyledTextField
          label='Server Name'
          fullWidth
          required
          onChange={handleServerNameChange}
          error={serverName.length === 0 && createServerAttempt > 0}
          helperText={(serverName.length === 0 && createServerAttempt > 0) && 'Server name is required'}
        />
        <DialogContentText sx={{ mb: 1 }}>
          Invite friends to your server
        </DialogContentText>
        <SelectMembers
          members={members}
          onMembersChange={handleMembersChange}
          disabled={createServerMutation.isPending}
        />
      </DialogContent>
      <DialogActions sx={{ paddingRight: 3 }}>
        <FormButton
          onClick={handleOnClose}
          variant='contained'
          color='warning'
          height={40}
          fullWidth={false}
          disabled={createServerMutation.isPending}
        >
          Cancel
        </FormButton>
        <FormButton
          onClick={handleCreateServer}
          variant='contained'
          color='primary'
          height={40}
          fullWidth={false}
          disabled={createServerMutation.isPending}
          isLoading={createServerMutation.isPending}
        >
          Create Server
        </FormButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreateServerDialog;
