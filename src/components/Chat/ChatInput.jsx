import { Box, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import { sendDirectMessage } from '../../services/messages';
import { useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const StyledBox = styled(Box)(({ theme }) => ({
  minHeight: 80,
  flexShrink: 0,
  maxHeight: '50%',
  overflowY: 'auto',
  padding: '24px',
  boxSizing: 'border-box',
}));

const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  padding: '16px 14px',
  paddingRight: '50px',
  backgroundColor: '#2f3136',
}));

const ChatInput = ({ friendId }) => {
  const [message, setMessage] = useState('');
  const sendDirectMessageMutation = useMutation({
    mutationFn: sendDirectMessage,
    onSuccess: () => {
      console.log('Message sent successfully');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSendMessage = () => {
    sendDirectMessageMutation.mutate({ friendId, message: {content: message, type: 'direct'} });
    setMessage('');
  };

  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <StyledBox>
      <StyledOutlinedInput
        multiline
        fullWidth
        placeholder='Message...'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPressed}
        endAdornment={
          <InputAdornment
            position='top-end'
            sx={{ position: 'absolute', top: 12, right: 20 }}
          >
            <IconButton aria-label='Send Message' edge='end' onClick={handleSendMessage}>
              <SendIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </StyledBox>
  );
};

export default ChatInput;
