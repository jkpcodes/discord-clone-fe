import { Outlet } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import AlertNotification from "../components/common/AlertNotification";
import { useSelector } from "react-redux";

const RootLayoutContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100%',
  width: '100%',
  margin: 0,
  padding: 0,
  backgroundColor: theme.palette.background.default,
}));

const RootLayout = () => {
  const { open, message, severity, vertical, horizontal } = useSelector(
    (state) => state.alert
  );

  return (
    <>
      <RootLayoutContainer>
        <Outlet />
      </RootLayoutContainer>
      <AlertNotification
        open={open}
        message={message}
        severity={severity}
        vertical={vertical}
        horizontal={horizontal}
      />
    </>
   );
};

export default RootLayout;