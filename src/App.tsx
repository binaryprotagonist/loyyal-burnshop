import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SnackbarProvider from "./components/snackbar/snackbarProvider";
import { AppProvider } from "./context/appContext";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <AppProvider>
            <Router />
          </AppProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
