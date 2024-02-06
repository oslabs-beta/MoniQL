import {
  Typography,
  Box,
  useTheme,
  Select,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Switch,
  Chip,
} from '@mui/material';
import tokens from './stylesheets/Themes';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { displayAlertsActionCreator } from '../actions/actions';

const SubHeader = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb='30px'>
      <Typography
        variant='h1'
        color={colors.grey[100]}
        fontWeight='bold'
        sx={{ m: '0 0 5px 0' }}
      >
        {title}
      </Typography>
      <Typography variant='h5' color={colors.greenAccent[400]}>
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
      if (selectedColumn && alert.column !== selectedColumn) {
        return false;
      }
      if (selectedMonitorType && alert.monitorType !== selectedMonitorType) {
        return false;
      }
      if (!showResolved && alert.resolved) {
        return false;
      }
      if (!showDismissed && alert.display) {
        return false;
      }
      if (showDismissed && alert.display === false) {
        return true;
      }
      return true;
    });
    dispatch(displayAlertsActionCreator(filteredAlerts));
  }, [
    selectedTable,
    selectedColumn,
    selectedMonitorType,
    showResolved,
    showDismissed,
    alerts,
  ]);

  return (
    <div>
      <Box m='30px'>
        <SubHeader
          title='Alerts'
          // subtitle="Anomalous rows detected below..."
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', minWidth: 120 }}>
            <FormControl sx={{ mr: 4, minWidth: 350 }} h>
              <InputLabel id='table-select-label'>Table Name</InputLabel>
              <Select
                labelId='table-select-label'
                value={selectedTable}
                label='Table'
                onChange={(e) => setSelectedTable(e.target.value)}
                sx={{
                  backgroundColor: '#2E2D3D',
                  borderRadius: '5px',
                }}
              >
                {tablesWithAlerts.map((table, index) => (
                  <MenuItem key={index} value={table}>
                    {table}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ mr: 4, minWidth: 200 }}>
              <InputLabel id='column-select-label'>Column Name</InputLabel>
              <Select
                labelId='column-select-label'
                value={selectedColumn}
                label='Column'
                onChange={(e) => setSelectedColumn(e.target.value)}
                sx={{
                  backgroundColor: '#2E2D3D',
                  borderRadius: '5px',
                }}
              >
                {columnsOnTablesWithAlerts[selectedTable] &&
                  columnsOnTablesWithAlerts[selectedTable].map(
                    (column, index) => (
                      <MenuItem key={index} value={column}>
                        {column}
                      </MenuItem>
                    )
                  )}
              </Select>
            </FormControl>
            <FormControl sx={{ mr: 4, minWidth: 200 }}>
              <InputLabel id='monitor-type-select-label'>
                Monitor Type
              </InputLabel>
              <Select
                labelId='monitor-type-select-label'
                value={selectedMonitorType}
                label='Monitor Type'
                onChange={(e) => setSelectedMonitorType(e.target.value)}
                sx={{
                  backgroundColor: '#2E2D3D',
                  borderRadius: '5px',
                }}
              >
                {monitorTypes.map((monitorType, index) => (
                  <MenuItem key={index} value={monitorType}>
                    {monitorType}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              display: 'flex',
              mt: 1
            }}
          >
            <FormControl
              sx={{
                marginTop: 1, // Adjust this value as needed
              }}
            >
              {/* <InputLabel>Display Resolved Alerts</InputLabel> */}
              <FormControlLabel
                control={
                  <Switch
                    checked={showResolved}
                    onChange={() => setShowResolved(!showResolved)}
                  />
                }
                label='Display Resolved Alerts'
                labelPlacement='start'
                // </Switch>
              />
            </FormControl>
            <FormControl
              sx={{
                marginTop: 1, // Adjust this value as needed
              }}
            >
              {/* <InputLabel>Display Dismissed Alerts</InputLabel> */}
              <FormControlLabel
                control={
                  <Switch
                    checked={showDismissed}
                    onChange={() => setShowDismissed(!showDismissed)}
                  />
                }
                label='Display Dismissed Alerts'
                labelPlacement='start'
                // </Switch>
              />
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
              size='large'
              sx={{
                fontSize: '1.2em',
                mt: 2,
                ml: 3,
              }}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default AlertsHeader;
