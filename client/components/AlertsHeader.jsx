import { Typography, Box, useTheme } from '@mui/material';
import tokens from './stylesheets/Themes';
import React from 'react';
import { useSelector } from 'react-redux';

const SubHeader = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
        variant="h1"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: '0 0 5px 0' }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {/* {subtitle} */}
      </Typography>
    </Box>
  );
};

const AlertsHeader = () => {

  // const alerts = useSelector((state) => state.alert.alerts);

  // look at alerts -- 
  // pull out tables
  // pull out columns
  // pull out monitor types
  
  // dropdown for table
  // dropdown for column
  // dropdown for monitor type
  // toggle for resolved/unresolved
  // toggle for dismissed/not dismissed (display property of alertObj)


  return (
    <div>
      <Box m="30px">
        <SubHeader
          title="Alerts"
          subtitle="Anomalous rows detected below..."
        />
      </Box>
    </div>
  );
};

export default AlertsHeader;
