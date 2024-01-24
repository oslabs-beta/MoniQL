import React from 'react';
import ErdVisualizerContainer from './ErdVisualizerContainer';
import MonitorContainer from './MonitorContainer'
import ReportContainer from './ReportContainer'
import QueryContainer from './QueryContainer'
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';

const PageContainer = () => {
  
  const page = useSelector((state) => state.app.page)
  
    return (
      <Box>
          {page === 'Visualize' && <ErdVisualizerContainer/>}
          {page === 'Monitors' && <MonitorContainer/>}
          {page === 'Reports' && <ReportContainer/>}
          {page === 'Query' && <QueryContainer/>}
          {page === 'Account' && <></>}
          {page === 'Settings' && <></>}
          {page === 'Help' && <></>}
      </Box>

    )
}

export default PageContainer
