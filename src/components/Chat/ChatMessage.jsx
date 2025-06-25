import { styled } from '@mui/material/styles';
import { ListItem, ListItemAvatar, ListItemText, Typography, Box } from '@mui/material';
import AppAvatar from '../common/AppAvatar';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  paddingTop: 0,
  paddingBottom: 0,
  boxSizing: 'border-box',

  '&:hover': {
    backgroundColor: theme.palette.action.hover,

    '& .StyledDateSecondaryTypography': {
      display: 'block',
    }
  },
}));

const StyledDateTypography = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: theme.palette.text.secondary,
}));

const StyledDateSecondaryTypography = styled(Typography)(({ theme }) => ({
  fontSize: '10px',
  color: theme.palette.text.secondary,
  position: 'absolute',
  left: 20,
  top: 10,
  display: 'none',
}));

const ChatMessage = ({ message, sameAuthor, isSameDay, formattedTime }) => {

  const ItemPrimaryText = (sameAuthor && isSameDay) ? null : (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: '10px' }}>
      {message.senderId.username}
      <StyledDateTypography>
        {formattedTime}
      </StyledDateTypography>
    </Box>
  );

  return (
    <StyledListItem>
      {(!sameAuthor || !isSameDay) && (
        <ListItemAvatar>
          <AppAvatar
            _id={message.senderId._id}
            name={message.senderId.username}
            size={35}
          />
        </ListItemAvatar>
      )}
      <ListItemText
        sx={{ paddingLeft: sameAuthor && isSameDay ? '56px' : '0px' }}
        primary={sameAuthor && isSameDay ? null : ItemPrimaryText}
        secondary={message.content}
      >
        <StyledDateSecondaryTypography className="StyledDateSecondaryTypography">
          {formattedTime}
        </StyledDateSecondaryTypography>
      </ListItemText>
    </StyledListItem>
  );
};

export default ChatMessage;
