import { Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const FormBoxDiv = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
}));

const FormBox = ({ title, onSubmit, children }) => {
  return (
    <FormBoxDiv component='form' onSubmit={onSubmit}>
      <Paper elevation={1} sx={{ width: 480, padding: 3 }}>
        <Typography
          variant='h5'
          component='div'
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginBottom: 2,
          }}
        >
          {title}
        </Typography>
        {children}
      </Paper>
    </FormBoxDiv>
  );
};

export default FormBox;
