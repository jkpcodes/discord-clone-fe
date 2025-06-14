import { Outlet } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const RootLayoutContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100%',
  width: '100%',
  margin: 0,
  padding: 0,
  backgroundColor: theme.palette.background.default,
}));

const RootLayout = () => {
  return (
    <RootLayoutContainer>
      <Outlet />
    </RootLayoutContainer>
   );
};

export default RootLayout;