import FormBox from '../components/common/FormBox';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { loginSchema } from '../utils/validators';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/common/InputField';
import RedirectInfo from '../components/common/RedirectInfoText';
import { useMutation } from '@tanstack/react-query';
import { login } from '../services/auth';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/authSlice';
import FormButton from '../components/common/FormButton';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: login,
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
    resolver: joiResolver(loginSchema),
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  const redirectHandler = () => {
    navigate('/register');
  };

  return (
    <FormBox title='Login' onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label='Email'
        name='email'
        form={register}
        error={errors.email}
        disabled={loginMutation.isPending}
        required
      />
      <InputField
        label='Password'
        name='password'
        type='password'
        form={register}
        error={errors.password}
        disabled={loginMutation.isPending}
        required
      />
      <FormButton isLoading={loginMutation.isPending}>Login</FormButton>
      <RedirectInfo
        text="Don't have an account?"
        redirectText='Register'
        redirectHandler={redirectHandler}
        disabled={loginMutation.isPending}
      />
    </FormBox>
  );
};

export default LoginPage;
