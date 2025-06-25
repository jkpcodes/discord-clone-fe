import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Box, styled, CircularProgress, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getServers } from '../../services/server';
import { useQuery } from '@tanstack/react-query';
import { setServers } from '../../store/serverSlice';


const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
}));

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const serversQuery = useQuery({
    queryKey: ['servers'],
    queryFn: getServers,
    enabled: isLoggedIn,
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true, state: null });
      return;
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (serversQuery.isSuccess) {
      dispatch(setServers(serversQuery.data));
    }
  }, [serversQuery.isSuccess, serversQuery.data, dispatch]);

  // Don't render anything until we've checked authentication
  if (!isLoggedIn || !localStorage.getItem('userDetails')) {
    return (
      <LoadingContainer>
        <Typography variant='h6'>Authenticating...</Typography>
        <CircularProgress />
      </LoadingContainer>
    );
  }

  return children;
};

export default ProtectedRoute;
