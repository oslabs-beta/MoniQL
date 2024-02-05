import React from "react";
import { BarChart } from '@mui/x-charts';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

const DashAlertBarChart = () => {

  // look at alerts in state
  // pull out data -- how many alerts of each status: unresolved, resolved, not dismissed, dismissed
  const alerts = useSelector((state) => state.alert.alerts);

  const alertsByStatus = {
    unresolved: 0,
    resolved: 0,
    notDismissed: 0,
    dismissed: 0
  };

  alerts.forEach(alertObj => {
    alertObj.resolved ? alertsByStatus.resolved++ : alertsByStatus.unresolved++;
    alertObj.display ? alertsByStatus.notDismissed++ : alertsByStatus.dismissed++;
  });

  return (
    <Box sx={{backgroundColor: '#6870fa', color: 'FAF9F6'}}>
      <BarChart
        // xAxisDataKey="status"
        // yAxisDataKey="alerts"
        xAxis={[
          { 
            value: 'alerts by status',
            scaleType: 'band',
            data: ['unresolved', 'resolved', 'not dismissed', 'dismissed']
          }]}
        series={[
          { 
            data: [alertsByStatus.unresolved, alertsByStatus.resolved, alertsByStatus.notDismissed, alertsByStatus.dismissed], 
          }]}
        width={500}
        height={300}
      />
    </Box>

  )

};

export default DashAlertBarChart;