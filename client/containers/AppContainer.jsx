import io from 'socket.io-client'
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


//TEMPORARY IMPORTS
import { useDispatch, useSelector } from 'react-redux';
import { saveDBActionCreator, addAlertsActionCreator, addMonitorsActionCreator } from '../actions/actions';
import AlertBox from '../components/AlertBox';
//END TEMPORARY IMPORTS

import Header from '../components/Header';
import SideBar from '../components/SideBar';
import ErdVisualizerContainer from '../containers/ErdVisualizerContainer';
import MonitorContainer from '../containers/MonitorContainer';
import CustomRangesMonitor from '../components/monitors/RangeMonitor';
import PageContainer from './PageContainer';
import SubheaderContainer from './SubheaderContainer';
// import { response } from "express";
import MainContainer from './MainContainer';

//////////////////////hay added for light/dark mode/////////////////////
// import { ThemeProvider } from '@emotion/react';
import { ColorModeContext, useMode } from '../components/stylesheets/Themes';
import { CssBaseline, ThemeProvider } from '@mui/material';
import LandingContainer from './LandingContainer';

//for pull out drawer:
//   import Topbar from "./scenes/global/Topbar";

const AppContainer = () => {
  //light/dark mode
  const [theme, colorMode] = useMode();
  //for pullout drawer:
  //   const [isSideBar, setIsSideBar] = useState(true);
  /* <SideBar isSideBar={isSideBar} /> */

  const dispatch = useDispatch();

  const user_uri = useSelector((state) => state.user.uri);
  
  useEffect(() => {
    const fetchDB = async () => {
      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({user_uri: user_uri})
        };
        const response = await fetch('/eboshi', requestOptions);
        const data = await response.json();
        console.log('dbArray in fetchDB in appContainer: ', data.dbArray);
        if (!response.ok) throw new Error(data.error || 'Error from server');
        dispatch(saveDBActionCreator(data.dbArray));
      } catch (err) {
        console.log('AppContainer Mounted', err);
      }
    };
    fetchDB();
  }, []);

  const user_id = useSelector((state) => state.user.user_id);

  useEffect(() => {
    fetchAllMonitors();
    getAllAlerts();
    if (user_id) {
      const socket = io('http://localhost:3000');
      socket.on('connect', () => {
        socket.emit('register', { user_id: user_id });
      });
      socket.on('alert', (alerts) => {
        console.log('(人´∀｀).☆.。.: SOCKET.IO IN APPCONTAINER RECIEVED ALERTS :.。.☆.(´∀`人)', alerts);
        dispatch(addAlertsActionCreator(alerts));
      });

      return () => {
        socket.disconnect();
      }
    }
  }, [user_id])


  const fetchAllMonitors = async () => {
    console.log('user_id in fetchAllMonitors in MonitorContainer', user_id);
    try {
      const response = await fetch('/getMonitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_id: user_id})
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('data in fetchAllMonitors in AppContainer', data);
      dispatch(addMonitorsActionCreator(data));
    } catch (error) {
      console.log('fetch error:', error);
    }
  };

  // useEffect(() => {
  //   fetchAllMonitors();  
  // }, []);

  const getAllAlerts = async () => {
    try {
      const response = await fetch('/alerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_id: user_id})
      });
      if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('data in getallalerts in alertcontainer: ', data);
      dispatch(addAlertsActionCreator(data));
    } catch (error) {
      console.log('fetch error:', error);
    }
  };

  // useEffect(() => {
  //   getAllAlerts();
  // }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <div className="AppContainer">
            <CssBaseline />
            <Header />
            <Box sx={{ display: 'flex' }}>
              <SideBar />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <SubheaderContainer />
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                  alignItems="center"
                  minHeight="100vh"
                  sx={{ right: 0 }}
                >
                  <PageContainer />
                </Box>
              </Box>
            </Box>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </LocalizationProvider>
  );
};

export default AppContainer;