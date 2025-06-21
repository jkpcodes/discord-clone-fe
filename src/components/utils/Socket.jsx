import { useEffect } from 'react';
import { connectToSocket } from '../../services/socket';
import { useSelector } from 'react-redux';

const Socket = () => {
  const { isLoggedIn, userDetails } = useSelector((state) => state.auth);
  const { connectionStatus } = useSelector((state) => state.socket);

  useEffect(() => {
    if (isLoggedIn && connectionStatus === 'disconnected' && userDetails.token) {
      connectToSocket(userDetails.token);
    }
  }, [isLoggedIn, userDetails?.token, connectionStatus]);

  return null;
}
 
export default Socket;