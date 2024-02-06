import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Box } from '@mui/material';

const DashAlertLineChart = () => {

  const alerts = useSelector((state) => state.alert.alerts);

  // look at alerts in state
  // pull out data -- how many alerts over each of the last 7 days
  // date on alert object: alertObj.detected_at
  const days = [];
  // populate days array with today and each of the past 6 days, in order, with dates
  for (let i = 6; i >= 0; i--) {
    days.push(dayjs().subtract(i, 'day').format('YYYY-MM-DD'));
  }

  // create an array to hold the number of alerts for each day
  const alertsByDay = new Array(7).fill(0);
  // populate alertsByDay array with the number of alerts for each day
  alerts.forEach((alertObj) => {
    const alertDate = dayjs(alertObj.detected_at).format('YYYY-MM-DD');
    const index = days.indexOf(alertDate);
    if (index !== -1) {
      alertsByDay[index] = alertsByDay[index] + 1;
    }
  });

  const dashLineChartData = days.map((day, index) => ({
    date: day,
    alerts: alertsByDay[index]
  }));
  console.log('dashLineChartData', dashLineChartData)
  console.log('alertsByDay', alertsByDay)
  console.log('days', days)


  return (
    <Box
      sx={{
        backgroundColor: "#6870fa",
        borderRadius: 4,
        m: 1
      }}
    >
      <h2 style={{ marginLeft: "1rem" }}>alerts by date</h2>
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
            scaleType: "point",
            data: days, //[-6, -5, -4, -3, -2, -1, 0],
            label: "date",
          },
        ]}
        series={[
          {
            data: alertsByDay,
          },
        ]}
        width={500}
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