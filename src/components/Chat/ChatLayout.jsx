import { AppBar, Box, Paper, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getDirectMessages } from '../../services/messages';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { useSelector, useDispatch } from 'react-redux';
import { setFriendChat, generateChatKey } from '../../store/chatSlice';
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

  const {
    data: infiniteData,
    error: infiniteError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['direct', id],
    queryFn: ({ pageParam = 0 }) => getDirectMessages({ friendId: id, skip: pageParam, take: TAKE_AMOUNT }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.pagination.hasMore) {
        return lastPage.pagination.skip;
      }
      return undefined;
    },
  });

  useEffect(() => {
    if (status === 'success' && infiniteData?.pages?.length > 0) {
      const conversationId = infiniteData.pages[0]._id;
      const participants = infiniteData.pages[0].participants;
      const messages = infiniteData.pages.flatMap((page) => page.messages);
      const pagination = infiniteData.pages[infiniteData.pages.length - 1].pagination;
      setSkip(pagination.skip);
      dispatch(setFriendChat({
        friendId: id,
        userId,
        _id: conversationId,
        messages,
        participants,
        pagination,
      }));
    }
  }, [status, infiniteData, dispatch, id, userId]);

  if (isFetching && !isFetchingNextPage) {
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
        <ChatMessages
          chatKey={chatKey}
          onLoadMore={() => {
            if (!isFetchingNextPage && hasNextPage) {
              console.log('refetching via useInfiniteQuery');
              fetchNextPage();
            }
          }}
          isFirstLoad={skip === 0}
          isLoadingMore={isFetchingNextPage}
        />
        <ChatInput friendId={id} />
      </ChatContentContainer>
    </ChatContainer>
  );
};

export default ChatLayout;
