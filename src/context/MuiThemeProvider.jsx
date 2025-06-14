import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5865f2',
    },
    // secondary: {
    //   main: '#000000',
    // },
    mode: 'dark',
    // customColors: {
    //   mainBackground: '#0f0f11',
    //   secondaryBackground: '#161618',
    // },
  },
});

const MuiThemeProvider = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiThemeProvider;
