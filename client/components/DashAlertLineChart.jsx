import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Box, Divider } from '@mui/material';

const DashAlertLineChart = () => {

  const alerts = useSelector((state) => state.alert.alerts);
  const dashDisplayAlertsTimeRangeFromState = useSelector((state) => state.diagram.dashDisplayAlertsTimeRange);

  const dashDisplayAlertsTimeRangeSize = dashDisplayAlertsTimeRangeFromState[1] - dashDisplayAlertsTimeRangeFromState[0];
  const dashDisplayAlertsTimeRangeInDays = Math.floor(dashDisplayAlertsTimeRangeSize / 86400000);
  const dashDisplayAlertsTimeRangeInterval = Math.ceil(dashDisplayAlertsTimeRangeInDays / 7);

  let numIntervals = 7;
  if (dashDisplayAlertsTimeRangeInDays < 7) {
    numIntervals = dashDisplayAlertsTimeRangeInDays;
  } 

  // look at alerts in state
  // pull out data -- how many alerts over each of the last 7 days
  // date on alert object: alertObj.detected_at
  const days = [];
  // populate days array with dates from beginning of time range to end of time range (7 steps)
  for (let i = numIntervals; i > 0; i--) {
    days.push(dayjs(dashDisplayAlertsTimeRangeFromState[1]).subtract((i - 1) * dashDisplayAlertsTimeRangeInterval, 'day').format('YYYY-MM-DD'));
  }
  // console.log('days in dashalertlinechart', days)

  // create an array to hold the number of alerts for each day
  const alertsByInterval = new Array(numIntervals).fill(0);
  // populate alertsByDay array with the number of alerts for each day
  for(let i = 0; i < alerts.length; i++){
    let j = 0;
    while(j < numIntervals) {
      const alertDate = dayjs(alerts[i].detected_at).format('YYYY-MM-DD');
      if(alertDate > days[j] && alertDate <= days[j + 1]) {
        alertsByInterval[j] = alertsByInterval[j] + 1;
      }
      j++;
    }
  }

  // console.log('alertsByInterval in dashalertlinechart', alertsByInterval)

  return (
    <Box
      sx={{
        backgroundColor: "#6870fa",
        borderRadius: 4,
        border: .5,
        borderColor: "gray",
      }}
    >
      <h2 style={{ marginLeft: "1rem" }}>Alerts by date</h2>
      <Divider sx={{ width: "100%", mb: 1 }} />

      <LineChart
        xAxisDataKey="date"
        yAxisDataKey="alerts"
        yAxis={[
          {
            label: "alerts",
          },
        ]}
        xAxis={[
          { 
            scaleType: 'point',
            data: days, 
            label: 'date',
          }]}
        series={[
          { 
            data: alertsByInterval, 
          }]}

        width={550}
        height={300}
        sx={{
          backgroundColor: "#6870fa",
          color: "FAF9F6",
          borderRadius: 4,
          width: "45%",
        }}
      />
    </Box>
  );
};

export default DashAlertLineChart;