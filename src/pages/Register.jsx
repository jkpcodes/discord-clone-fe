import FormBox from '../components/common/FormBox';
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
import FormButton from '../components/common/FormButton';

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
        disabled={registerMutation.isPending}
        required
      />
      <InputField
        label='Username'
        name='username'
        form={register}
        error={errors.username}
        disabled={registerMutation.isPending}
        required
      />
      <InputField
        label='Password'
        name='password'
        type='password'
        form={register}
        error={errors.password}
        disabled={registerMutation.isPending}
        required
      />
      <InputField
        name='confirmPassword'
        type='password'
        label='Confirm Password'
        form={register}
        error={errors.confirmPassword}
        disabled={registerMutation.isPending}
        required
      />
      <FormButton isLoading={registerMutation.isPending}>Register</FormButton>
      <RedirectInfo
        text='Already have an account?'
        redirectText='Login'
        redirectHandler={redirectHandler}
        disabled={registerMutation.isPending}
      />
    </FormBox>
  );
};

export default RegisterPage;
