import { Alert, Snackbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { clearAlert } from "../../store/alertSlice";
import { styled } from "@mui/material/styles";

const StyledSnackbar = styled(Snackbar)({
  "& .MuiPaper-root": {
    '&.MuiAlert-standardError': {
      backgroundColor: "#7e1a1a",

      "& .MuiAlert-icon": {
        color: "#f4c7c7",
      }
    },
    '&.MuiAlert-standardSuccess': {
      backgroundColor: "#1a7e1a",
      "& .MuiAlert-icon": {
        color: "#c7f4c7",
      }
    }
  },
});

const AlertNotification = ({
  open,
  message,
  severity,
  vertical,
  horizontal,
}) => {
  const dispatch = useDispatch();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(clearAlert());
  };

  return (
    <StyledSnackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert severity={severity}>{message}</Alert>
    </StyledSnackbar>
  );
};

export default AlertNotification;
