import { Typography, Box, useTheme, Divider } from '@mui/material';
import tokens from './stylesheets/Themes';
import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { updateDashDisplayTimeRangeActionCreator } from '../actions/actions';

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
        {subtitle}
      </Typography>
    </Box>
  );
};

const DashboardHeader = () => {
  const dispatch = useDispatch();
  const dashDisplayAlertsTimeRangeFromState = useSelector((state) => state.diagram.dashDisplayAlertsTimeRange);
  const dashDisplayAlertsTimeRangeAsDayjs = dashDisplayAlertsTimeRangeFromState.map((date) => dayjs(date));
  const [dashDisplayAlertsTimeRange, setDashDisplayAlertsTimeRange] = useState(dashDisplayAlertsTimeRangeAsDayjs);  


  const handleDashDisplayAlertsTimeRange = (timeRangeArr) => {
    const timeRangeArrAsDate = timeRangeArr.map((date) => new Date(date));
    dispatch(updateDashDisplayTimeRangeActionCreator(timeRangeArrAsDate));
    setDashDisplayAlertsTimeRange(timeRangeArr);
    console.log('timeRangeArr', timeRangeArr)
  };

  return (
    <div>
      <Box m="30px">
        <SubHeader
          title="Dashboard"
          // subtitle="Hi, welcome to your dashboard  ʕ ⊃･ ◡ ･ ʔ⊃ ━☆ﾟ.*･｡*☆"
        />
      </Box>
      <Box sx={{display: 'inline-flex'}}>
        <DatePicker
          label="Pick dates to display alerts for"
          defaultValue={dashDisplayAlertsTimeRange[0]}
          value={dashDisplayAlertsTimeRange[0]}
          onChange={newValue => handleDashDisplayAlertsTimeRange([newValue, dashDisplayAlertsTimeRange[1]])}
        />
        <Divider/>
        <DatePicker
          label="Pick dates to display alerts for"
          value={dashDisplayAlertsTimeRange[1]}
          onChange={newValue => handleDashDisplayAlertsTimeRange([dashDisplayAlertsTimeRange[0], newValue])}
        />
      </Box>
    </div>
  );
};

export default DashboardHeader;
