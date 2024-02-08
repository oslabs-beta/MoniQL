import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; 
import AlertBox from '../components/AlertBox';
import {
  Box,
  Card,
  Typography,
  useTheme,
  ThemeProvider,
  Divider
} from "@mui/material";
import tokens from '../components/stylesheets/Themes';


const AlertContainer = () => {
  const alerts = useSelector((state) => state.alert.alerts);
  const displayAlertsArrFromState = useSelector((state) => state.alert.displayAlerts);

  const [displayAlertsArr, setDisplayAlertsArr] = useState(displayAlertsArrFromState);
  const [anomalies, setAnomalies] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const sortedAlerts = displayAlertsArrFromState.sort((a, b) => new Date(b.detected_at) - new Date(a.detected_at));
    setDisplayAlertsArr(sortedAlerts);
    const anomaliesAsComponents = sortedAlerts.map((alertObj, i) => <AlertBox key={i} {...alertObj}/>);
    setAnomalies(anomaliesAsComponents);
  }, [alerts, displayAlertsArrFromState]);

  // allow user to filter alerts by
  // table
  // column
  // monitorType
  // resolved / not
  // dismissed / not
  // date

  // pull from state - alert.filterBy
  // filter anomalies thusly

  return (
    <Box sx={{
      ml: '1%',
    }}>
      <Card className='card-container'
        variant='outlined'
        sx={{
          minWidth: '20vw',
          flexDirection: 'column',
          minHeight: '60vh',
          padding: 3,
          boxShadow: 3,
          backgroundColor: '#2E2D3D',
          borderRadius: 4,
          
        }}
      >
         <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5" color={colors.grey[100]}>
            Anomalies found
          </Typography>
        </Box>
        <Divider sx={{ width: '100%', mb: 1 }} />
      <Box sx={{mr: 2}}>{anomalies}</Box>
      </Card>
    </Box>
  );
}

export default AlertContainer;