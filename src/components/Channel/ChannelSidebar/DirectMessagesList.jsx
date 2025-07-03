import { List, ListItemButton, ListItemText } from '@mui/material';
import AppAvatar from '../../common/AppAvatar';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const StyledList = styled(List)(({ theme }) => ({
  width: '100%',
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  paddingTop: 12,
  paddingBottom: 12,
}));

const DirectMessagesList = () => {
  const navigate = useNavigate();
  const { directMessages, onlineFriendsId } = useSelector(
    (state) => state.friend
  );

  const handleDirectMessageClick = (friendId) => {
    navigate(`/channel/me/${friendId}`);
  };

  return (
    <StyledList>
      {directMessages.map((directMessage) => (
        <StyledListItemButton
          key={directMessage._id}
          onClick={() => handleDirectMessageClick(directMessage.friend._id)}
        >
          <AppAvatar
            _id={directMessage.friend._id}
            name={directMessage.friend.username}
            size={30}
            showName
            showBadge
            isOnline={onlineFriendsId.includes(directMessage.friend._id)}
          />
        </StyledListItemButton>
      ))}
    </StyledList>
  );
};

export default DirectMessagesList;
