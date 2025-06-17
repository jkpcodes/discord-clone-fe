import FormBox from '../components/common/FormBox';
import { TextField, Button, FormControl, FormHelperText } from '@mui/material';
import { registerSchema } from '../utils/validators';
import InputField from '../components/common/InputField';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import RedirectInfo from '../components/common/RedirectInfoText';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { register as registerUser } from '../services/auth';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/authSlice';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      dispatch(setUserDetails(data.userDetails));
      navigate('/channel/me', { replace: true, state: null });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(registerSchema),
  });

  const onSubmit = (data) => {
    registerMutation.mutate(data);
  };

  const redirectHandler = () => {
    navigate('/login');
  };

  return (
    <FormBox title='Register' onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label='Email'
        name='email'
        form={register}
        error={errors.email}
        required
      />
      <InputField
        label='Username'
        name='username'
        form={register}
        error={errors.username}
        required
      />
      <InputField
        label='Password'
        name='password'
        type='password'
        form={register}
        error={errors.password}
        required
      />
      <InputField
        name='confirmPassword'
        type='password'
        label='Confirm Password'
        form={register}
        error={errors.confirmPassword}
        required
      />
      <Button
        type='submit'
        variant='contained'
        color='primary'
        fullWidth
        sx={{ mb: 2, height: 50 }}
      >
        Register
      </Button>
      <RedirectInfo
        text="Already have an account?"
        redirectText="Login"
        redirectHandler={redirectHandler}
      />
    </FormBox>
  );
};

export default RegisterPage;
