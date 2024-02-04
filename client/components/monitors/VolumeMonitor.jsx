import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMonitorsActionCreator } from "../../actions/actions";
import {
  Box, Card, Button, Divider, FormControl, FormHelperText,
  Stack, Typography, MenuItem, Select, TextField
} from "@mui/material";
import monitorObjectCreator from "./monitorObjectCreator";

const VolumeMonitor = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useState({
    table: '',
    timeColumn: '',
    interval: '',
    period: '',
    ending: '',
  });

  const tablesArray = useSelector((state) => state.diagram.data);
  const user_id = useSelector((state) => state.user.user_id);
  const [columnsArray, setColumnsArray] = useState([]);

  useEffect(() => {
    tablesArray.forEach((table) => {
      if (params.table === table.table_name) {
        const columns = table.columns.map(column => column.name)
        setColumnsArray(columns);
      }
    });
  }, [params.table, tablesArray]);

  const handleChanges = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('this is params', params);
    const monitorObject = monitorObjectCreator('Volume', user_id, params);
    // dispatch(addMonitorActionCreator(monitorObject))
      //make post request to server
    try {
  const response = await fetch('/monitors', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(monitorObject)
  })
  if (!response.ok) {
    throw new Error (`HTTP error! status: ${response.status}`);
  }
    const data = await response.json();
    console.log(data);

    dispatch(addMonitorsActionCreator(data));
  } catch (error) {
    console.log('fetch error:', error);
  }
}
  

  return (
    <div>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Card
          variant="outlined"
          sx={{ width: "50vw", display: "flex", flexDirection: "column",
                justifyContent: "center", padding: 3, boxShadow: 3,
                backgroundColor: "rgba(255, 255, 255, 0.7)", borderRadius: 4 }}>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h5" color="white">Create New Volume Monitor</Typography>
              <Divider />
            </Box>
            <Stack direction="column" spacing={1} alignItems="center" justifyContent="left">
  
              {/* TABLE AND TIME COLUMN SELECT */}
              <Stack direction="row" spacing={2} sx={{ width: '100%', justifyContent: 'center' }}>
                <Select
                  required
                  id="select-table"
                  label="Table"
                  value={params.table}
                  name='table'
                  onChange={handleChanges}
                  sx={{ backgroundColor: "white", borderRadius: "5px", width: '45%' }}>
                  {tablesArray.map((item, index) => (
                    <MenuItem key={index} value={item.table_name}>{item.table_name}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>Select a table for monitoring</FormHelperText>

                <Select
                  required
                  id="select-timeColumn"
                  label="Time Column"
                  value={params.timeColumn}
                  name='timeColumn'
                  onChange={handleChanges}
                  sx={{ backgroundColor: "white", borderRadius: "5px", width: '45%' }}>
                  {columnsArray.map((item, index) => (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>Select a time column from the table</FormHelperText>
              </Stack>
  
              {/* INTERVAL AND PERIOD AND ENDING INPUT */}
              {/* <Stack direction="row" spacing={2} sx={{ width: '100%', justifyContent: 'space-between' }}> */}
                <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
                <TextField
                  required
                  id="interval"
                  label="Interval"
                  type="number"
                  name="interval"
                  value={params.interval}
                  onChange={handleChanges}
                  sx={{ backgroundColor: "white", borderRadius: "5px", m: 1 }}
                />
                <FormHelperText>Enter the monitoring interval</FormHelperText>

                <TextField
                  required
                  id="period"
                  label="Period"
                  type="text"
                  name="period"
                  value={params.period}
                  onChange={handleChanges}
                  sx={{ backgroundColor: "white", borderRadius: "5px", m: 1 }}
                />
                <FormHelperText>Enter the monitoring period</FormHelperText>

                <TextField
                  required
                  id="ending"
                  label="Ending"
                  type="text"
                  name="ending"
                  value={params.ending}
                  onChange={handleChanges}
                  sx={{ backgroundColor: "white", borderRadius: "5px", m: 1 }}
                />
                <FormHelperText>Enter the end point</FormHelperText>
              </Box>
            {/* </Stack> */}
              {/* Description Input */}
            <TextField
              required
              id="description"
              label="Description"
              multiline
              rows={4}
              name="description"
              value={params.description}
              onChange={handleChanges}
              sx={{ backgroundColor: "white", borderRadius: "5px", width: '100%'}}
            />
            <FormHelperText>Enter a description for the monitor</FormHelperText>

          </Stack>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 3, mb: 2 }}
            size="small"
          >
            Submit
          </Button>
        </FormControl>
      </Card>
    </Box>
  </div>
);
}

export default VolumeMonitor;