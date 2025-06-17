import { List, ListItem, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
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

const FriendsList = ({
  headerText1,
  friendsList1,
  headerText2 = null,
  friendsList2 = null,
  mode = 'online',
}) => {
  return (
    <StyledList>
      <StyledListItem>
        <Typography variant='h6'>
          {headerText1} - {friendsList1.length}
        </Typography>
      </StyledListItem>
      {friendsList1.map((friend) => (
        <FriendListItem key={friend._id} friend={friend} mode={mode} />
      ))}
      {headerText2 && (
        <>
          <StyledListItem>
            <Typography variant='h6'>
              {headerText2} - {friendsList2.length}
            </Typography>
          </StyledListItem>
          {friendsList2.map((friend) => (
            <FriendListItem key={friend._id} friend={friend} mode='sent' />
          ))}
        </>
      )}
    </StyledList>
  );
};

export default FriendsList;
