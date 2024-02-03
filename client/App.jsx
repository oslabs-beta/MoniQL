// External libraries
import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from "@mui/material";

// Components
import LoginContainer from './components/LoginContainer';
import AppContainer from './containers/AppContainer';
import AlertBox from './components/AlertBox';
import Sidebar from './components/SideBar';

// Styles and themes
import './components/stylesheets/App.css';
import { ColorModeContext, useMode, tokens } from "./components/stylesheets/Themes";

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
