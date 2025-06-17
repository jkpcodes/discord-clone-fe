import { Button, CircularProgress } from '@mui/material';

const FormButton = ({
  fullWidth = true,
  isLoading,
  children,
  height = 50,
  ...props
}) => {
  return (
    <Button
      type='submit'
      variant='contained'
      color='primary'
      disabled={isLoading}
      fullWidth={fullWidth}
      sx={{ mb: 2, height }}
      {...props}
    >
      {isLoading ? <CircularProgress size={25} /> : children}
    </Button>
  );
};

export default FormButton;
