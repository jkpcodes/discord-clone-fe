import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import PublicRoute from './components/utils/PublicRoute';
import ProtectedRoute from './components/utils/ProtectedRoute';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ChannelPage from './pages/Channel/Channel';
import MePage from './pages/Channel/Me';
import ServerPage from './pages/Channel/Server';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
      },
      {
        path: '/login',
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
      },
      {
        path: '/register',
        element: (
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        ),
      },
      {
        path: '/channel',
        element: (
          <ProtectedRoute>
            <ChannelPage />
          </ProtectedRoute>
        ),
        children: [
          {
            path: '/channel/me',
            element: <MePage />,
          },
          {
            path: '/channel/:id',
            element: <ServerPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
