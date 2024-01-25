import React from 'react';  
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import ErdVisualizerContainer from './ErdVisualizerContainer';
import MonitorContainer from './MonitorContainer';
import ReportContainer from './ReportContainer';
import QueryContainer from './QueryContainer';
import FocusBar from '../components/FocusBar';

const SubheaderContainer = () => {
    const page = useSelector((state) => state.app.page)
  
    return (
      // <Box sx={{ border: "1px solid #000" }}>
      <Box sx={{ mt: -4, mb: 0, mr: -3, ml: 0 }}>
        {page === "Dashboard" && <FocusBar />}
        {page === "ERD" && <FocusBar />}
        {page === "Monitors" && <FocusBar />}
        {page === "Reports" && <></>}
        {page === "Query" && <></>}
        {page === "Account" && <></>}
        {page === "Settings" && <></>}
        {page === "Help" && <></>}
      </Box>
    );
}

export default SubheaderContainer;