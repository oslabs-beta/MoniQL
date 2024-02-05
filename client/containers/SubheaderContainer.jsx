import React from 'react';  
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import ErdVisualizerContainer from './ErdVisualizerContainer';
import MonitorContainer from './MonitorContainer';
import ReportContainer from './ReportContainer';
import QueryContainer from './QueryContainer';
import FocusBar from '../components/FocusBar';
import MonitorHeader from '../components/MonitorHeader';  
import DashboardHeader from "../components/DashboardHeader";  
import ReportsHeader from "../components/AlertsHeader";  
import QueryHeader from "../components/QueryHeader";  


const SubheaderContainer = () => {
  const page = useSelector((state) => state.app.page)
  
  return (
  // <Box sx={{ border: "1px solid #000" }}>
    <Box sx={{ mt: -4, mb: 0, mr: -3, ml: 0 }}>
      {page === "Dashboard" && <DashboardHeader />}
      {page === "ERD" && <FocusBar />}
      {page === "Monitors" && <MonitorHeader />}
      {page === "Reports" && <ReportsHeader />}
      {page === "Query" && <QueryHeader />}
      {page === "Account" && <></>}
      {page === "Settings" && <></>}
      {page === "Help" && <></>}
    </Box>
  );
}

export default SubheaderContainer;