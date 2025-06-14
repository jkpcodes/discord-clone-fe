import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const RedirectText = styled("span")(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 500,
  cursor: "pointer",
}));

const RedirectInfo = ({
  text,
  redirectText,
  additionalStyles,
  redirectHandler,
}) => {
  return (
    <Typography
      style={additionalStyles ? additionalStyles : {}}
      sx={{ mb: 2 }}
      variant="subtitle2"
    >
      {text}
      <RedirectText onClick={redirectHandler}> {redirectText}</RedirectText>
    </Typography>
  );
};

export default RedirectInfo;
