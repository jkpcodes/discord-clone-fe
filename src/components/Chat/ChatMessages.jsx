import { List, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChatMessage from './ChatMessage';
import ChatDateSeparator from './ChatDateSeparator';
import { useSelector } from 'react-redux';
import { useRef, useEffect, useState } from 'react';

const StyledList = styled(List)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  width: '100%',
  overflow: 'auto',
  boxSizing: 'border-box',

  // Custom scrollbar styling
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#2f3136',
    borderRadius: '4px',
    backgroundClip: 'padding-box',
    '&:hover': {
      background: '#40444b',
      backgroundClip: 'padding-box',
    },
  },

  scrollbarWidth: 'thin',
  scrollbarColor: '#2f3136 transparent',
}));

const formatDate = (date, format) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const amPm = hours >= 12 ? 'PM' : 'AM';

  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear(),
    hh: hours % 12 === 0 ? 12 : hours % 12,
    min: (minutes < 10 ? `0${minutes}` : minutes) + ` ${amPm}`,
  };

  return format.replace(/mm|dd|yy|yyyy|hh|min/g, (match) => map[match]);
};

const ChatMessages = ({ chatKey, onLoadMore }) => {
  const chatData = useSelector((state) => state.chat.directChat[chatKey]);
  const lastMessageRef = useRef(null);
  // const listRef = useRef(null)
  const [isAtTop, setIsAtTop] = useState(false); // Track scroll position
  const [isAtBottom, setIsAtBottom] = useState(false); // Track scroll position
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Add null check and provide default values
  const { messages = [], pagination = { hasMore: false } } = chatData || {};

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setIsAtTop(scrollTop === 0);
    setIsAtBottom(scrollTop + clientHeight === scrollHeight);
  }

  useEffect(() => {
    if (messages.length > 0 && isInitialLoad) {
      setTimeout(() => {
        lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        setIsInitialLoad(false);
      }, 100);
    }
  }, [messages, isInitialLoad]);

  // Only scroll to bottom if at bottom and new messages are added
  useEffect(() => {
    if (lastMessageRef.current && isAtBottom) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAtBottom]);

  useEffect(() => {
    if (isAtTop && pagination.hasMore) {
      onLoadMore();
    }
  }, [isAtTop, pagination?.hasMore, onLoadMore]);

  return (
    <StyledList onScroll={handleScroll}>
      {!pagination.hasMore && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 0,
          }}
        >
          <Typography variant='span'>
            {messages.length === 0
              ? 'No chat history'
              : 'This is the start of the conversation.'}
          </Typography>
        </Box>
      )}
      {messages.map((message, index) => {
        const sameAuthor =
          index > 0 &&
          message.senderId._id === messages[index - 1]?.senderId._id;

        const formattedDateWithTime = formatDate(
          new Date(message.date),
          'mm/dd/yy hh:min'
        );
        const formattedDate = formatDate(new Date(message.date), 'mm/dd/yy');
        const isSameDay =
          index > 0 &&
          formattedDate ===
            formatDate(new Date(messages[index - 1]?.date), 'mm/dd/yy');
        const formattedTime = formatDate(new Date(message.date), 'hh:min');
        const isLastMessage = index === messages.length - 1;

        return (
          <Box key={message._id} ref={isLastMessage ? lastMessageRef : null}>
            {!isSameDay && <ChatDateSeparator date={formattedDate} />}
            <ChatMessage
              message={message}
              sameAuthor={sameAuthor}
              isSameDay={isSameDay}
              formattedDateWithTime={formattedDateWithTime}
              formattedDate={formattedDate}
              formattedTime={formattedTime}
            />
          </Box>
        );
      })}
    </StyledList>
  );
};

export default ChatMessages;
