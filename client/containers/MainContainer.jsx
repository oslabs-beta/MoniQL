import * as React from 'react';
import { Box } from '@mui/material';
import Focus from '../components/Focus';
import FocusBar from '../components/FocusBar';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import DashboardContainer from './DashboardContainer';
// import { theme1, theme2 } from "../public/styles/theme";

const MainContainer = () => {
  return (
    <div>
      <DashboardContainer />
      {/* <ThemeProvider theme={isThemeLight ? lightTheme : darkTheme}> */}
      <Box 
        component="main"
      display="flex" 
      flexDirection="row"
      sx={{
          flexGrow: 1,
          p: 3,
          height: '100vh',
        }}
      >
      </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '15px',
            zIndex: 2,
          }}
        >
        </Box>
      {/* </ThemeProvider> */}
    </div>
  );
};

export default MainContainer;
