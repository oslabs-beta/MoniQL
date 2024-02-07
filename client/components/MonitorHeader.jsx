import {
  Typography,
  Box,
  useTheme,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Chip,
} from '@mui/material';
import tokens from './stylesheets/Themes';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { displayMonitorsActionCreator } from '../actions/actions';

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
        {/* {subtitle} */}
      </Typography>
    </Box>
  );
};

const MonitorHeader = () => {
  const dispatch = useDispatch();
  const monitors = useSelector((state) => state.monitor.activeMonitors);
  const displayMonitors = useSelector((state) => state.monitor.displayMonitors);

  const [selectedTable, setSelectedTable] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('');
  const [selectedMonitorType, setSelectedMonitorType] = useState('');

  // look at monitors
  // pull out the tables that are being monitored
  const tablesWithMonitors = [];
  monitors.forEach((monitor) => {
    if (!tablesWithMonitors.includes(monitor.parameters.table)) {
      tablesWithMonitors.push(monitor.parameters.table);
    }
  });

  // pull out the columns that are being monitored, tied to the table
  const columnsOnTablesWithMonitors = {};
  tablesWithMonitors.forEach((table) => {
    columnsOnTablesWithMonitors[table] = [];
  });
  monitors.forEach((monitor) => {
    if (
      columnsOnTablesWithMonitors[monitor.parameters.table] &&
      !columnsOnTablesWithMonitors[monitor.parameters.table].includes(
        monitor.parameters.column
      )
    ) {
      columnsOnTablesWithMonitors[monitor.parameters.table].push(
        monitor.parameters.column
      );
    }
  });

  // pull out the monitor types that are in monitors
  const monitorTypesInUse = [];
  monitors.forEach((monitor) => {
    if (!monitorTypesInUse.includes(monitor.type)) {
      monitorTypesInUse.push(monitor.type);
    }
  });

  console.log('tablesWithMonitors', tablesWithMonitors);
  console.log('columnsOnTablesWithMonitors', columnsOnTablesWithMonitors);

  useEffect(() => {
    const filteredMonitors = monitors.filter((monitor) => {
      if (selectedTable && monitor.parameters.table !== selectedTable) {
        return false;
      }
      if (selectedColumn && monitor.parameters.column !== selectedColumn) {
        return false;
      }
      if (selectedMonitorType && monitor.type !== selectedMonitorType) {
        return false;
      }
      return true;
    });
    dispatch(displayMonitorsActionCreator(filteredMonitors));
  }, [selectedTable, selectedColumn, selectedMonitorType, monitors, displayMonitors]);

  // dropdown for tables
  // dropdown for columns on tables
  // dropdown for monitor types
  // chip for reset filters

  return (
    <div>
      <Box m='30px'>
        <SubHeader
          title='Monitors'
          subtitle='View and manage your monitors ୧༼◕ ᴥ ◕༽୨'
        />

        <Box sx={{ display: 'flex', flexDirection: 'row', minWidth: 120 }}>
          <FormControl sx={{ mr: 4, minWidth: 350 }}>
            <InputLabel id='table-select-label'>Table Name</InputLabel>
            <Select
              labelId='table-select-label'
              id='table-select'
              value={selectedTable}
              label='Table'
              onChange={(e) => setSelectedTable(e.target.value)}
              sx={{
                backgroundColor: '#2E2D3D',
                borderRadius: '5px',
              }}
            >
              {tablesWithMonitors.length &&
                tablesWithMonitors.map((table, i) => {
                  return (
                    <MenuItem key={i} value={table}>
                      {table}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <FormControl sx={{ mr: 4, minWidth: 200 }}>
            <InputLabel id='column-select-label'>Column Name</InputLabel>
            <Select
              labelId='column-select-label'
              id='column-select'
              value={selectedColumn}
              label='Column'
              onChange={(e) => setSelectedColumn(e.target.value)}
              sx={{
                backgroundColor: '#2E2D3D',
                borderRadius: '5px',
              }}
            >
              {columnsOnTablesWithMonitors[selectedTable] &&
                columnsOnTablesWithMonitors[selectedTable].map((column, i) => {
                  return (
                    <MenuItem key={i} value={column}>
                      {column}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <FormControl sx={{ mr: 4, minWidth: 200 }}>
            <InputLabel id='monitor-type-select-label'>Monitor Type</InputLabel>
            <Select
              labelId='monitor-type-select-label'
              id='monitor-type-select'
              value={selectedMonitorType}
              label='Monitor Type'
              onChange={(e) => setSelectedMonitorType(e.target.value)}
              sx={{
                backgroundColor: '#2E2D3D',
                borderRadius: '5px',
              }}
            >
              {monitorTypesInUse.map((type, i) => {
                return (
                  <MenuItem key={i} value={type}>
                    {type}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Chip
            label='Reset Filters'
            onClick={() => {
              setSelectedTable('');
              setSelectedColumn('');
              setSelectedMonitorType('');
            }}
            size='large'
            sx={{
              fontSize: '1.2em',
              mt: 1,
            }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default MonitorHeader;
