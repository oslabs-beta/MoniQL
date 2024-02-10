import React, { useState, useEffect } from 'react';
import { useSelector, useStore, useDispatch } from 'react-redux';
import {Box, Typography, Divider} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { addTablesWeightsActionCreator } from '../actions/actions';

const DashTableOfTables = () => {
  const store = useStore();
  const dispatch = useDispatch();

  const monitors = useSelector((state) => state.monitor.activeMonitors);
  const alerts = useSelector((state) => state.alert.alerts);
  const tableMetadata = useSelector((state) => state.diagram.data);

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

  let mostRecentUpdate;

  const getDashMonitorData = () => {

    const newDashMonitorData = { ...dashMonitorData };

    // console.log('alerts in getDashMonitorData in dashToT', alerts)
    
    alerts.forEach((alertObj) => {  
      const { table, resolved, display, monitorType } = alertObj;
      // console.log('table in getDashMonitorData in dashToT', table, 'resolved', resolved, 'display', display, 'monitorType', monitorType)
    
      if(!didGetDashMonitorData){
        if(newDashMonitorData[table]){ 
          newDashMonitorData[table].numAlerts++;
          resolved ? newDashMonitorData[table].numResolved++ : newDashMonitorData[table].numUnresolved++;
          display ? newDashMonitorData[table].numNotDismissed++ : newDashMonitorData[table].numDismissed++;
          newDashMonitorData[table][`num${monitorType}`]++;
        }
      } else if(alertObj.updated_at > mostRecentUpdate){
        if(newDashMonitorData[table]){
          newDashMonitorData[table].numAlerts++;
          resolved ? newDashMonitorData[table].numResolved++ : newDashMonitorData[table].numUnresolved++;
          display ? newDashMonitorData[table].numNotDismissed++ : newDashMonitorData[table].numDismissed++;
          newDashMonitorData[table][`num${monitorType}`]++;
        }
      }
    });

    setDashMonitorData(newDashMonitorData);
    setDidGetDashMonitorData(true);
    mostRecentUpdate = Date.now();
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
    { field: 'id', headerName: 'ID', width: 30},
    { field: 'table', headerName: 'Table', width: 180},
    { field: 'downstream', headerName: 'Downstream Entities', width: 130},
    { field: 'monitors', headerName: 'Monitors', width: 85},
    { field: 'alerts', headerName: 'Alerts', width: 85},
    { field: 'unresolved', headerName: 'Unresolved', width: 85},
    { field: 'resolved', headerName: 'Resolved', width: 85},
    { field: 'displayed', headerName: 'Displayed', width: 85},
    { field: 'dismissed', headerName: 'Dismissed', width: 85},
    { field: 'range', headerName: 'Range', width: 85},
    { field: 'null', headerName: 'Null', width: 85},
    { field: 'custom', headerName: 'Custom', width: 85}
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
    // console.log('popDToTR called')
    // console.log('tablesWeightsObj in DToT: ', tablesWeightsObj);
    // console.log('dashMonitorData in DToT: ', dashMonitorData)

    const newDashToTRows = [];
    for(const tableInDMD in dashMonitorData){
      const { numMonitors, numAlerts, numUnresolved, numResolved, 
        numNotDismissed, numDismissed, numRange, numNull, numCustom, numDownstream } = dashMonitorData[tableInDMD];
      // console.log('tableInDMD', tableInDMD)
      // console.log('dashMonitorData', dashMonitorData)
      
      newDashToTRows.push({
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

    setdashToTRows(newDashToTRows);
  };

  useEffect(() => {
    if(Object.keys(dashMonitorData).length) getDashMonitorData();
  }, [didPopulateDashMonitorObj, alerts]);

  // do not delete -- only commenting this out until we move the tableWeight function to a helper file
  // useEffect(() => {
  //   if (didGetDashMonitorData){
  //     const tablesWeightsObj = store.getState().diagram.tablesWeightsObj;
  //     console.log('tablesWeightsObj in getDashMonitorData in dashToT', tablesWeightsObj)
  //     setTablesWeightsObj(tablesWeightsObj);
  //   }
  // }, [didGetDashMonitorData]);

  // useEffect(() => {
  //   console.log('tablesWeightsObj updated: ', tablesWeightsObj)
  // }, [tablesWeightsObj]);

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
  }, [didGetDashMonitorData, tablesWeightsObj, alerts]);

  // pasting this function from Focus.jsx -- should be in a helper file -- then uncomment useEffect above 
  const tableWeight = () => {
    const importance = new Map();
    tableMetadata.forEach((table) => {
      //table name = key / num of FKs (<< hehe) = value
      importance.set(table.table_name, (table.foreign_keys || []).length);
    });

    // if(tableWeightNotCalledYet) {
    const importanceObj = Object.fromEntries(importance);
    dispatch(addTablesWeightsActionCreator(importanceObj));
    setTablesWeightsObj(importanceObj);
    // tableWeightNotCalledYet.current = false;
    // }

    return importance;
  };

  useEffect(() => {
    // console.log('calling tableWeight in dashToT') 
    tableWeight();
  }, [didGetDashMonitorData]);

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Typography variant="h3">Tables</Typography> */}
        <Box className="graph-container"
          sx={{
            height: 540,
            // backgroundColor: "rgba(104, 112, 250, 0.8)",
            border: 0.5,
            borderColor: "rgb(33,30,38)",
          }}
        >
          {/* <Typography variant="h4" sx={{ml: 2}}>monitored tables</Typography> */}
          <h2 style={{ marginLeft: "1rem" }}>Monitored tables</h2>
                <Divider sx={{ width: "100%", mb: 1 }} />
          <DataGrid
            autoHeight
            rows={dashToTRows}
            columns={dashToTColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            sx={{
              height: 400,
              paddng: 2,
              headerAlign: "center",
              backgroundColor: "transparent",
              borderRadius: 0,
              border: 0,
              color: "FAF9F6",
              width: "100%",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DashTableOfTables;