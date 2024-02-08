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
        alignItems: "flex-start",
        opacity: "100%",
        width: "85vw",
        ml: "1%",
        mt: 1
        
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          // justifyContent: "center",
          mb: 3,
          gap: 3,
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
