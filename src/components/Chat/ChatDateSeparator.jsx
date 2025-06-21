import { styled } from '@mui/material/styles';
import { Divider, Paper, Typography } from '@mui/material';

const SeparatorContainer = styled(Paper)({
  width: 'calc(100% - 30px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '1px',
  backgroundColor: '#72767d',
  position: 'relative',
  margin: '15px',
});

const StyledPaper = styled(Paper)({
  position: 'absolute',
  width: 'auto',
  boxShadow: 'none',
  paddingRight: '12px',
  paddingLeft: '12px',
});

const MessageDateSeparator = ({ date }) => {
  return (
    <SeparatorContainer>
      <Divider />
      <StyledPaper elevation={4} sx={{ boxShadow: 'none' }}>
        <Typography
          variant='span'
          sx={{ display: 'block', width: 'fit-content' }}
        >
          {date}
        </Typography>
      </StyledPaper>
    </SeparatorContainer>
  );
};

export default MessageDateSeparator;
