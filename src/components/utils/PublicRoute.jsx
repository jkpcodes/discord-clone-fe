import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const PublicRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/channel/me', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return children;
};

export default PublicRoute;