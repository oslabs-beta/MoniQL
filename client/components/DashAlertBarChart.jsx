import React from 'react';
import { BarChart } from '@mui/x-charts';
import { Box, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import dayjs from "dayjs";

const DashAlertBarChart = () => {

  // look at alerts in state
  // pull out data -- how many alerts of each status: unresolved, resolved, not dismissed, dismissed
  const alerts = useSelector((state) => state.alert.alerts);
  const dashDisplayAlertsTimeRange = useSelector((state) => state.diagram.dashDisplayAlertsTimeRange);

  const alertsInTimeRange = alerts.filter((alertObj) => {
    return dayjs(alertObj.detected_at).isAfter(dayjs(dashDisplayAlertsTimeRange[0])) && dayjs(alertObj.detected_at).isBefore((dashDisplayAlertsTimeRange[1]))
  });

  const alertsByStatus = {
    unresolved: 0,
    resolved: 0,
    notDismissed: 0,
    dismissed: 0
  };

  alertsInTimeRange.forEach(alertObj => {
    alertObj.resolved ? alertsByStatus.resolved++ : alertsByStatus.unresolved++;
    alertObj.display ? alertsByStatus.notDismissed++ : alertsByStatus.dismissed++;
  });

  return (
    <Box
      sx={{
        backgroundColor: "#6870fa",
        borderRadius: 4,
      }}
    >
      <h2 style={{ marginLeft: "1rem" }}>alerts by status</h2>
      <Divider sx={{ width: "100%", mb: 1 }} />

      <BarChart
        // xAxisDataKey="status"
        // yAxisDataKey="alerts"
        yAxis={[
          {
            label: "alerts",
          },
        ]}
        xAxis={[
          {
            label: "alert status",
            scaleType: "band",
            data: ["unresolved", "resolved", "not dismissed", "dismissed"],
          },
        ]}
        series={[
          {
            data: [
              alertsByStatus.unresolved,
              alertsByStatus.resolved,
              alertsByStatus.notDismissed,
              alertsByStatus.dismissed,
            ],
          },
        ]}
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

export default DashAlertBarChart;