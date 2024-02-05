import { Typography, Box, useTheme, Select, FormControl, InputLabel, MenuItem, Switch, Chip } from '@mui/material';
import tokens from './stylesheets/Themes';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { displayAlertsActionCreator } from '../actions/actions';

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

const AlertsHeader = () => {
  const dispatch = useDispatch();
  const alerts = useSelector((state) => state.alert.alerts);

  const [selectedTable, setSelectedTable] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('');
  const [selectedMonitorType, setSelectedMonitorType] = useState('');
  const [showResolved, setShowResolved] = useState(true);
  const [showDismissed, setShowDismissed] = useState(true);

  // look at alerts -- 
  // pull out tables
  const tablesWithAlerts = [];
  alerts.forEach((alert) => {
    if (!tablesWithAlerts.includes(alert.table)) {
      tablesWithAlerts.push(alert.table);
    }
  });

  // pull out columns
  const columnsOnTablesWithAlerts = {};
  alerts.forEach((alert) => {
    if (!columnsOnTablesWithAlerts[alert.table]) {
      columnsOnTablesWithAlerts[alert.table] = [];
    }
    if (!columnsOnTablesWithAlerts[alert.table].includes(alert.column)) {
      columnsOnTablesWithAlerts[alert.table].push(alert.column);
    }
  });

  // pull out monitor types
  const monitorTypes = [];
  alerts.forEach((alert) => {
    if (!monitorTypes.includes(alert.monitorType)) {
      monitorTypes.push(alert.monitorType);
    }
  });
  
  // dropdown for table
  // dropdown for column
  // dropdown for monitor type
  // toggle for resolved/unresolved
  // toggle for dismissed/not dismissed (display property of alertObj)

  // break this up into separate useEffects
  useEffect(() => {
    const filteredAlerts = alerts.filter((alert) => {
      if (selectedTable && alert.table !== selectedTable) {
        return false;
      }
      return true;
    });
    dispatch(displayAlertsActionCreator(filteredAlerts));
  }, [selectedTable, alerts]);

  useEffect(() => {
    const filteredAlerts = alerts.filter((alert) => {
      if (selectedColumn && alert.column !== selectedColumn) {
        return false;
      }
      return true;
    });
    dispatch(displayAlertsActionCreator(filteredAlerts));
  }, [selectedColumn, alerts]);

  useEffect(() => {
    const filteredAlerts = alerts.filter((alert) => {
      if (selectedMonitorType && alert.monitorType !== selectedMonitorType) {
        return false;
      }
      return true;
    });
    dispatch(displayAlertsActionCreator(filteredAlerts));
  }, [selectedMonitorType, alerts]);

  useEffect(() => {
    const filteredAlerts = alerts.filter((alert) => {
      if (!showResolved && alert.resolved) {
        return false;
      }
      return true;
    });
    dispatch(displayAlertsActionCreator(filteredAlerts));
  }, [showResolved]);

  useEffect(() => {
    const filteredAlerts = alerts.filter((alert) => {
      if (!showDismissed && alert.dismissed) {
        return false;
      }
      return true;
    });
    dispatch(displayAlertsActionCreator(filteredAlerts, alerts));
  }, [showDismissed]);

  return (
    <div>
      <Box m="30px">
        <SubHeader
          title="Alerts"
          subtitle="Anomalous rows detected below..."
        />
      </Box>
      <Box>
        <FormControl fullWidth>
          <InputLabel id='table-select-label'>Table</InputLabel>
          <Select
            labelId='table-select-label'
            value={selectedTable}
            label="Table"
            onChange={(e) => setSelectedTable(e.target.value)}
          >
            {tablesWithAlerts.map((table, index) => (
              <MenuItem key={index} value={table}>{table}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id='column-select-label'>Column</InputLabel>
          <Select
            labelId='column-select-label'
            value={selectedColumn}
            label="Column"
            onChange={(e) => setSelectedColumn(e.target.value)}
          >
            {columnsOnTablesWithAlerts[selectedTable] && columnsOnTablesWithAlerts[selectedTable].map((column, index) => (
              <MenuItem key={index} value={column}>{column}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id='monitor-type-select-label'>Monitor Type</InputLabel>
          <Select
            labelId='monitor-type-select-label'
            value={selectedMonitorType}
            label="Monitor Type"
            onChange={(e) => setSelectedMonitorType(e.target.value)}
          >
            {monitorTypes.map((monitorType, index) => (
              <MenuItem key={index} value={monitorType}>{monitorType}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Display Resolved Alerts</InputLabel>
          <Switch 
            checked={showResolved}
            onChange={() => setShowResolved(!showResolved)}
          >
              Display Resolved Alerts
          </Switch>
        </FormControl>
        <FormControl>
          <InputLabel>Display Dismissed Alerts</InputLabel>
          <Switch 
            checked={showDismissed}
            onChange={() => setShowDismissed(!showDismissed)}
          >
              Display Dismissed Alerts
          </Switch>
        </FormControl>
        <Chip 
          label='Reset Filters' 
          onClick={() => {
            setSelectedTable('');
            setSelectedColumn('');
            setSelectedMonitorType('');
            setShowResolved(true);
            setShowDismissed(true);
          }}
        />
      </Box>
    </div>
  );
};

export default AlertsHeader;
