import { AppBar, Box, Paper, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getDirectMessages } from '../../services/messages';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { useSelector, useDispatch } from 'react-redux';
import { setFriendChat, generateChatKey, loadMoreMessages } from '../../store/chatSlice';
import { useState, useEffect } from 'react';

const ChatContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  margin: 0,
  padding: 0,
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  height: 60,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: 24,
  paddingRight: 24,
  boxSizing: 'border-box',
}));

const ChatContentContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  height: 'calc(100% - 60px)',
  width: '100%',
  boxSizing: 'border-box',
  overflow: 'hidden',
}));

const TAKE_AMOUNT = 50;

const ChatLayout = ({ enableHeader = true, headerContent = null }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const userId = useSelector((state) => state.auth.userDetails._id);
  const chatKey = generateChatKey(userId, id);
  const [skip, setSkip] = useState(0);

  console.log('skip: ', skip);

  // Load initial conversationData
  const {
    data: conversationData,
    isLoading,
    isSuccess,
    error,
    refetch,
  } = useQuery({
    queryKey: ['direct', id],
    queryFn: () => getDirectMessages({ friendId: id, skip, take: TAKE_AMOUNT }),
  });

  // Move state updates to useEffect
  useEffect(() => {
    if (isSuccess && conversationData) {
      if (skip === 0) {
        dispatch(setFriendChat({
          friendId: id,
          userId,
          _id: conversationData._id,
          messages: conversationData.messages,
          participants: conversationData.participants,
          pagination: conversationData.pagination,
        }));
      } else {
        dispatch(loadMoreMessages({
          participantIds: [userId, id],
          messages: conversationData.messages,
          pagination: conversationData.pagination,
        }));
      }
      setSkip(conversationData.messages.length);
    }
  }, [isSuccess, conversationData, id, userId, dispatch]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <Box>
          <CircularProgress />
        </Box>
        <Typography>Loading messages...</Typography>
      </Box>
    );
  }

  return (
    <ChatContainer>
      {enableHeader && (
        <StyledAppBar position='sticky' elevation={1}>
          {headerContent}
        </StyledAppBar>
      )}
      <ChatContentContainer elevation={4}>
        <ChatMessages chatKey={chatKey} onLoadMore={refetch} isFirstLoad={skip === 0} />
        <ChatInput friendId={id} />
      </ChatContentContainer>
    </ChatContainer>
  );
};

export default ChatLayout;
