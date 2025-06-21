import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import AppAvatar from "../../common/AppAvatar";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  flexGrow: 1,
}));

const FriendChatHeader = () => {
  const location = useLocation();
  const friendId = location.pathname.split('/')[3];
  const { friends } = useSelector((state) => state.friend);
  const friend = friends.find((friend) => friend._id === friendId);

  return (
    <StyledBox>
      {friend && <AppAvatar _id={friend._id} name={friend.username} size={40} showName />}
      {/* TODO: Add call and video call buttons */}
    </StyledBox>
  );
}
 
export default FriendChatHeader;