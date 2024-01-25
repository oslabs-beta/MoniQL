import React from 'react';
import LoginContainer from './components/LoginContainer';
import AppContainer from './containers/AppContainer';
import "./components/stylesheets/App.css";
import { useSelector } from 'react-redux';
import AlertBox from './components/AlertBox';

//hay added for light/dark mode
import { useState } from "react";
import { ColorModeContext, useMode, tokens } from "./components/stylesheets/Themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Sidebar from './components/SideBar';



//for pull out drawer:
// import Topbar from "./scenes/global/Topbar";

const App = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  //light/dark mode
  const [theme, colorMode] = useMode();
  // const [isSideBar, setIsSideBar] = useState(true);
  
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {/* <CssBaseline /> */}
        <div className="App">
          {/* <Sidebar isSideBar={isSideBar} /> */}
          {/* <Topbar setIsSidebar={setIsSidebar} /> */}
          {/* { (isLoggedIn) ? <AppContainer /> : <LoginContainer /> } */}
          <AppContainer />
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;

