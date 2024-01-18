import React from 'react';
import TestComponent from './components/TestComponent';
import LoginContainer from './components/LoginContainer';
import Header from "./components/Header";
import SideBar from "./components/SideBar";

import "./components/stylesheets/App.css";

// import { createTheme, ThemeProvider } from "@mui/material";

// const theme = createTheme({
//   typography: {
//     fontFamily: "Roboto",
//   },
//   palette: {
//     primary: {
//       main: "#6a994e",
//       light: "#42a5f5",
//       dark: "#1565c0",
//     },
//     secondary: {
//       main: "#9c6644",
//       light: "#42a5f5",
//       dark: "#1565c0",
//     },
//   },
// });

const App = () => {
  return (
    <div className='App'>
      <Header />
      <SideBar />
      <LoginContainer />
    </div>
  );
};

export default App;
