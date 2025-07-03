import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import AppAvatar from '../../common/AppAvatar';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  flexGrow: 1,
}));

const FriendChatHeader = () => {
  const { id: friendId } = useParams();
  const { friends, onlineFriendsId } = useSelector((state) => state.friend);
  const friend = friends.find((friend) => friend._id === friendId);

  const isOnline = onlineFriendsId.includes(friendId);

  return (
    <StyledBox>
      {friend && (
        <AppAvatar
          _id={friend._id}
          name={friend.username}
          size={40}
          showName
          showBadge
          isOnline={isOnline}
        />
      )}
      {/* TODO: Add call and video call buttons */}
    </StyledBox>
  );
};

export default FriendChatHeader;
