import React, { useState, useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const DashTableOfTables = () => {
  const store = useStore();

  const monitors = useSelector((state) => state.monitor.activeMonitors);
  const alerts = useSelector((state) => state.alert.alerts);

  const [dashMonitorData, setDashMonitorData] = useState({});
  const [dashToTRows, setdashToTRows] = useState([]);
  const [tablesWeightsObj, setTablesWeightsObj] = useState(null);

  const [didPopulateDashMonitorObj, setDidPopulateDashMonitorObj] = useState(false);
  const [didGetDashMonitorData, setDidGetDashMonitorData] = useState(false);

  // look at alerts in state
  // pull out data -- how many monitors are looking at each table
  // table on monitor object: monitorObj.params.table

  const populateDashMonitorObj = () => {
    const newDashMonitorData = { ...dashMonitorData };
    let hasChanged = false;

    monitors.forEach((monitorObj) => {
      // console.log('monitorObj in popDMDO in dashToT', monitorObj)
      const table = monitorObj.parameters.table;
      if (newDashMonitorData[table]) {
        newDashMonitorData[table].numMonitors++;
        hasChanged = true;
      } else {
        newDashMonitorData[table] = {
          numDownstream: 0,
          numMonitors: 1,
          numAlerts: 0,
          numUnresolved: 0,
          numResolved: 0,
          numNotDismissed: 0,
          numDismissed: 0,
          numRange: 0,
          numNull: 0,
          numCustom: 0
        };
        hasChanged = true;
      }
    });

    if (hasChanged){
      setDashMonitorData(newDashMonitorData);
      // console.log('dashMonitorData just populated', dashMonitorData)
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

    // console.log('alerts in getDashMonitorData in dashToT', alerts)
    
    alerts.forEach((alertObj) => {  
      const { table, resolved, display, monitorType } = alertObj;
      // console.log('table in getDashMonitorData in dashToT', table, 'resolved', resolved, 'display', display, 'monitorType', monitorType)
      if(newDashMonitorData[table]) {
        newDashMonitorData[table].numAlerts++;
        resolved ? newDashMonitorData[table].numResolved++ : newDashMonitorData[table].numUnresolved++;
        display ? newDashMonitorData[table].numNotDismissed++ : newDashMonitorData[table].numDismissed++;
        newDashMonitorData[table][`num${monitorType}`]++;
      }
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
  // number of alerts of type custom

  const dashToTColumns = [
    { field: 'id', headerName: 'ID', width: 75},
    { field: 'table', headerName: 'Table', width: 150},
    { field: 'downstream', headerName: 'Downstream', width: 75},
    { field: 'monitors', headerName: 'Monitors', width: 75},
    { field: 'alerts', headerName: 'Alerts', width: 75},
    { field: 'unresolved', headerName: 'Unresolved', width: 75},
    { field: 'resolved', headerName: 'Resolved', width: 75},
    { field: 'displayed', headerName: 'Displayed', width: 75},
    { field: 'dismissed', headerName: 'Dismissed', width: 75},
    { field: 'range', headerName: 'Range', width: 75},
    { field: 'null', headerName: 'Null', width: 75},
    { field: 'custom', headerName: 'Custom', width: 75}
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
    // if(!tablesWeightsObj) return;
    console.log('popDToTR called')
    console.log('tablesWeightsObj in DToT: ', tablesWeightsObj);
    console.log('dashMonitorData in DToT: ', dashMonitorData)
    // let id = 1;
    const newDashToTRows = [];
    for(const tableInDMD in dashMonitorData){
      const { numMonitors, numAlerts, numUnresolved, numResolved, 
        numNotDismissed, numDismissed, numRange, numNull, numCustom, numDownstream } = dashMonitorData[tableInDMD];
      // console.log('tableInDMD', tableInDMD)
      // console.log('dashMonitorData', dashMonitorData)
      
      newDashToTRows.push({
        // id: id++,
        table: tableInDMD,
        downstream: numDownstream,
        monitors: numMonitors,
        alerts: numAlerts,
        unresolved: numUnresolved,
        resolved: numResolved,
        displayed: numNotDismissed,
        dismissed: numDismissed,
        range: numRange,
        null: numNull,
        custom: numCustom
      });
    }
    // sort in descending order of numDownstream
    newDashToTRows.sort((a, b) => {
      return b.downstream - a.downstream;
    });

    newDashToTRows.forEach((row, i) => {
      row.id = i + 1;
    });

    console.log('newDashToTRows', newDashToTRows)
    setdashToTRows(newDashToTRows);
  };

  useEffect(() => {
    if(Object.keys(dashMonitorData).length) getDashMonitorData();
  }, [didPopulateDashMonitorObj, alerts]);

  useEffect(() => {
    if (didGetDashMonitorData){
      const tablesWeightsObj = store.getState().diagram.tablesWeightsObj;
      setTablesWeightsObj(tablesWeightsObj);
    }
  }, [didGetDashMonitorData]);

  useEffect(() => {
    console.log('tablesWeightsObj updated: ', tablesWeightsObj)
  }, [tablesWeightsObj]);

  useEffect(() => {
    if(didGetDashMonitorData && tablesWeightsObj){
      // console.log('tablesWeightsObj in getDashMonitorData in dashToT', tablesWeightsObj)
      for(const tableInTablesWeightsObj in tablesWeightsObj){
        if(dashMonitorData[tableInTablesWeightsObj]){
          dashMonitorData[tableInTablesWeightsObj].numDownstream = tablesWeightsObj[tableInTablesWeightsObj];
        }
      }
      populateDashToTRows();
    }
  }, [didGetDashMonitorData, tablesWeightsObj]);


  return (
    <Box sx={{ height: 400, width: '100%', backgroundColor: '#6870fa', color: 'FAF9F6'}}>
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