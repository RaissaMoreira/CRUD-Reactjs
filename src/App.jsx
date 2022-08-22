import Registers from "./components/Registers";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#009ADF',
        dark: '#002639',
        light: '#A4A4A4'
      }
    },
    typography: {
      fontFamily:'Montserrat',
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightBold: 800
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Registers />
      </div>
    </ThemeProvider>
  );
};

export default App;
