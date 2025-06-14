import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& > .MuiFormHelperText-root': {
    position: 'absolute',
    top: '48px',
    my: 0,
  },
  '& > .MuiInputBase-root > input': {
    padding: 14,
  }
}));

const InputField = ({ name, label, error, form, ...props }) => {

  return (
    <StyledTextField
      label={label}
      {...form(name)}
      {...props}
      error={!!error}
      helperText={error?.message}
      fullWidth
    />
  );
};

export default InputField;
