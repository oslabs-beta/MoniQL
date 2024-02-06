import React from 'react';
import DashTableOfTables from '../components/DashTableOfTables';
import DashAlertLineChart from '../components/DashAlertLineChart';
import DashAlertBarChart from '../components/DashAlertBarChart';
import Box from '@mui/material/Box'

const DashboardContainer = () => {
  return (
    <Box sx={{opacity: "80%"}}>
      <Box sx={{ display: 'flex' }}>
        <DashAlertLineChart />
        <DashAlertBarChart />
      </Box>
      <DashTableOfTables />
    </Box >
  );
};

export default DashboardContainer;
