import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Box, styled, CircularProgress } from '@mui/material';

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
}));

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true, state: null });
    }
  }, [isLoggedIn, navigate]);

  // Don't render anything until we've checked authentication
  if (!isLoggedIn || !localStorage.getItem('userDetails')) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  }

  return children;
};

export default ProtectedRoute;
