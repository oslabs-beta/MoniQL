import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const DashTableOfTables = () => {

const monitors = useSelector((state) => state.monitor.activeMonitors);
const alerts = useSelector((state) => state.alert.alerts);

const [dashMonitorData, setDashMonitorData] = useState({});
const [dashToTRows, setdashToTRows] = useState([]);

const [didPopulateDashMonitorObj, setDidPopulateDashMonitorObj] = useState(false);
const [didGetDashMonitorData, setDidGetDashMonitorData] = useState(false);

// look at alerts in state
// pull out data -- how many monitors are looking at each table
// table on monitor object: monitorObj.params.table

// let didPopulateDashMonitorObj = useRef(false);

const populateDashMonitorObj = () => {
    const newDashMonitorData = { ...dashMonitorData };
    let hasChanged = false;

    monitors.forEach((monitorObj) => {
        console.log('monitorObj in popDMDO in dashToT', monitorObj)
        const table = monitorObj.parameters.table;
        if (newDashMonitorData[table]) {
            newDashMonitorData[table].numMonitors++;
            hasChanged = true;
        } else {
            newDashMonitorData[table] = {
              numMonitors: 1,
              numAlerts: 0,
              numUnresolved: 0,
              numResolved: 0,
              numNotDismissed: 0,
              numDismissed: 0,
              numRange: 0,
              numNull: 0
            };
            hasChanged = true;
        }
      });

        if (hasChanged){
            setDashMonitorData(newDashMonitorData);
            console.log('dashMonitorData just populated', dashMonitorData)
          //   didPopulateDashMonitorObj.current = true; 
          setDidPopulateDashMonitorObj(true);
        }
};

useEffect(() => {
    populateDashMonitorObj();
}, [monitors]);

useEffect(() => {
    console.log('dashMonitorData updated', dashMonitorData);
  }, [dashMonitorData]);

const getDashMonitorData = () => {

  const newDashMonitorData = { ...dashMonitorData };

  console.log('alerts in getDashMonitorData in dashToT', alerts)
    
  alerts.forEach((alertObj) => {  
        const { table, resolved, display, monitorType } = alertObj;
        console.log('table in getDashMonitorData in dashToT', table, 'resolved', resolved, 'display', display, 'monitorType', monitorType)
        if(newDashMonitorData[table]) {
        newDashMonitorData[table].numAlerts++;
        resolved ? newDashMonitorData[table].numResolved++ : newDashMonitorData[table].numUnresolved++;
        display ? newDashMonitorData[table].numNotDismissed++ : newDashMonitorData[table].numDismissed++;
        newDashMonitorData[table][`num${monitorType}`]++;
        };
    });

  setDashMonitorData(newDashMonitorData);
  setDidGetDashMonitorData(true);
};

// columns:
  // id
  // table name
  // number of monitors
  // number of alerts
  // number of unresolved alerts
  // number of resolved alerts
  // number of displayed alerts
  // number of hidden alerts
  // number of alerts of type range
  // number of alerts of type null

const dashToTColumns = [
  { field: 'id', headerName: 'ID', width: 75},
  { field: 'table', headerName: 'Table', width: 150},
  { field: 'monitors', headerName: 'Monitors', width: 75},
  { field: 'alerts', headerName: 'Alerts', width: 75},
  { field: 'unresolved', headerName: 'Unresolved', width: 75},
  { field: 'resolved', headerName: 'Resolved', width: 75},
  { field: 'displayed', headerName: 'Displayed', width: 75},
  { field: 'hidden', headerName: 'Hidden', width: 75},
  { field: 'range', headerName: 'Range', width: 75},
  { field: 'null', headerName: 'Null', width: 75},
]; 

// turn out: array of rows

// each row:
  // table name
  // number of monitors
  // number of alerts
  // number of unresolved alerts
  // number of resolved alerts
  // number of displayed alerts
  // number of hidden alerts
  // number of alerts of type range
  // number of alerts of type null

const populateDashToTRows = () => {
    let id = 1;
    const newDashToTRows = [];
    for(let tableInDMD in dashMonitorData){
        const { numMonitors, numAlerts, numUnresolved, numResolved, 
          numNotDismissed, numDismissed, numRange, numNull } = dashMonitorData[tableInDMD];
          console.log('tableInDMD', tableInDMD)
          console.log('dashMonitorData', dashMonitorData)
      
              newDashToTRows.push({
                  id: id++,
                  table: tableInDMD,
                  monitors: numMonitors,
                  alerts: numAlerts,
                  unresolved: numUnresolved,
                  resolved: numResolved,
                  displayed: numNotDismissed,
                  hidden: numDismissed,
                  range: numRange,
                  null: numNull
              });
            };
            console.log('newDashToTRows', newDashToTRows)
        setdashToTRows(newDashToTRows);
};

useEffect(() => {
    console.log('alerts in useEff in dashToT', alerts)
    // if (didPopulateDashMonitorObj.current) {
    if(didPopulateDashMonitorObj) getDashMonitorData();
    // }
}, [didPopulateDashMonitorObj, alerts]);

useEffect(() => {
    if(didGetDashMonitorData) populateDashToTRows();
}, [didGetDashMonitorData, dashMonitorData]);


return (
  <Box sx={{ height: 400, width: '100%', backgroundColor: 'black', color: 'white'}}>
    <DataGrid
      rows={dashToTRows}
      columns={dashToTColumns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      checkboxSelection
    />
  </Box>
)
};

export default DashTableOfTables;