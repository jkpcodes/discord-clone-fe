import { Button, CircularProgress } from "@mui/material";

const FormButton = ({isLoading, children, ...props}) => {
  return (
    <Button
      type='submit'
      variant='contained'
      color='primary'
      disabled={isLoading}
      fullWidth
      sx={{ mb: 2, height: 50 }}
      {...props}
    >
      {isLoading ? <CircularProgress size={25} /> : children}
    </Button>
  )
}
 
export default FormButton;