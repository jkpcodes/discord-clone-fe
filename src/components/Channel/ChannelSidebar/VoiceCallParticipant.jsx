import { ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import AppAvatar from '../../common/AppAvatar';


const StyledListItem = styled(ListItemText)(({ theme }) => ({
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

const VoiceCallParticipant = ({ participant }) => {
  return (
    <StyledListItem>
      <AppAvatar _id={participant._id} name={participant.username} size={30} showName/>
    </StyledListItem>
  );
};

export default VoiceCallParticipant;