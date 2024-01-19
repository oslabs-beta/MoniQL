import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

const Themes = {};

 Themes.headerTheme = createTheme({
  typography: {
    fontFamily: "Roboto",
  },
  palette: {
    primary: {
      main: "#6a994e",
      light: "#42a5f5",
      dark: "#1565c0",
    },
    secondary: {
      main: "#9c6644",
      light: "#42a5f5",
      dark: "#1565c0",
    },
  },
});

export default Themes;
