import React from 'react';
import ErdVisualizerContainer from './ErdVisualizerContainer';
import MonitorContainer from './MonitorContainer'
import ReportContainer from './ReportContainer'
import QueryContainer from './QueryContainer'
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';

import MainContainer from './MainContainer';

const PageContainer = () => {
  
  const page = useSelector((state) => state.app.page)
  
    return (
      <Box>
        {page === "Dashboard" && <MainContainer />}
        {page === "ERD" && <ErdVisualizerContainer />}
        {page === "Monitors" && <MonitorContainer />}
        {page === "Reports" && <ReportContainer />}
        {page === "Query" && <QueryContainer />}
        {page === "Account" && <></>}
        {page === "Settings" && <></>}
        {page === "Help" && <></>}
      </Box>
    );
}

export default PageContainer
