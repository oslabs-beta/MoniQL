import React, {useEffect, useState} from "react";
import { Box } from '@mui/material';

//TEMPORARY IMPORTS
import { useDispatch } from "react-redux";
import { saveDBActionCreator } from "../actions/actions";
//END TEMPORARY IMPORTS

import Header from "../components/Header";
import SideBar from "../components/SideBar";
import ErdVisualizerContainer from "../containers/ErdVisualizerContainer";
import MonitorContainer from "../containers/MonitorContainer";  
import CustomRangesMonitor from "../components/monitors/RangeMonitor";
import PageContainer from './PageContainer';
import SubheaderContainer from "./SubheaderContainer";
// import { response } from "express";
import MainContainer from "./MainContainer";
  

const AppContainer = () => {

  //sidebar


  const dispatch = useDispatch();
  useEffect(() => {
    const fetchDB = async () => {
      try {
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        const response = await fetch("/eboshi", requestOptions);
        const data = await response.json();
        console.log(data.dbArray);
        if (!response.ok) throw new Error(data.error || "Error from server");
        dispatch(saveDBActionCreator(data.dbArray));
      } catch (err) {
        console.log("AppContainer Mounted", err);
      }
    };
    fetchDB();
  }, []);

  return (
    <div className="AppContainer">
      {/* <Sidebar  />; */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Header />
        <Box sx={{ display: "flex", mt: 10 }}>
          {/* <SideBar sx={{ m: 0, p: 0 }} /> */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <SubheaderContainer />
            <PageContainer />
            {/* <MainContainer/> */}
          </Box>
        </Box>
      </Box>
      {/* <ErdVisualizerContainer /> */}
      {/* <MonitorContainer /> */}
      {/* <CustomRangesMonitor /> */}
    </div>
  );
}

export default AppContainer;