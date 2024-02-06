import React from 'react';
import DashTableOfTables from '../components/DashTableOfTables';
import DashAlertLineChart from '../components/DashAlertLineChart';
import DashAlertBarChart from '../components/DashAlertBarChart';
import Box from '@mui/material/Box'

const DashboardContainer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        opacity: "100%",
        width: "85vw",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "space-around",
          mb: 3,
        }}
      >
        <DashAlertLineChart />
        <DashAlertBarChart />
      </Box>
      <DashTableOfTables />
    </Box>
  );
};

export default DashboardContainer;
