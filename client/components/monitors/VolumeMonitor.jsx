import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMonitorsActionCreator } from "../../actions/actions";
import {
  Box,
  Card,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Typography,
  MenuItem,
  Select,
  TextField,
  InputLabel,
} from "@mui/material";
import monitorObjectCreator from "./monitorObjectCreator";

const VolumeMonitor = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useState({
    table: "",
    timeColumn: "",
    interval: "",
    period: "",
    ending: "",
  });

  const tablesArray = useSelector((state) => state.diagram.data);
  const user_id = useSelector((state) => state.user.user_id);
  const [columnsArray, setColumnsArray] = useState([]);

  useEffect(() => {
    tablesArray.forEach((table) => {
      if (params.table === table.table_name) {
        const columns = table.columns.map((column) => column.name);
        setColumnsArray(columns);
      }
    });
  }, [params.table, tablesArray]);

  const handleChanges = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("this is params", params);
    const monitorObject = monitorObjectCreator("Volume", user_id, params);
    // dispatch(addMonitorActionCreator(monitorObject))
    //make post request to server
    try {
      const response = await fetch("/monitors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(monitorObject),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);

      dispatch(addMonitorsActionCreator(data));
    } catch (error) {
      console.log("fetch error:", error);
    }
  };

  return (
    <div>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Card
          variant="outlined"
          sx={{
            width: "25vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 3,
            boxShadow: 3,
            // backgroundColor: "token.primary",
            borderRadius: 4,
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h5" color="white">
                New Volume Monitor
              </Typography>
              <Divider />
            </Box>

            {/* TABLE AND TIME COLUMN SELECT */}
            <Box display="flex" justifyContent="space-between">
              <FormControl sx={{ flex: 1, minWidth: "40%", mr: "1rem" }}>
                <InputLabel id="table-name" style={{ color: "#4cceac" }}>
                  Table Name
                </InputLabel>

                <Select
                  required
                  id="select-table"
                  label="Table Name"
                  labelId="table-name"
                  value={params.table}
                  name="table"
                  onChange={handleChanges}
                  color="secondary"
                  sx={{
                    borderRadius: "5px",
                    width: "100%",
                  }}
                >
                  {tablesArray.map((item, index) => (
                    <MenuItem key={index} value={item.table_name}>
                      {item.table_name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Select a table for monitoring</FormHelperText>
              </FormControl>
              <FormControl sx={{ flex: 1, minWidth: "40%" }}>
                <InputLabel id="table-name" style={{ color: "#4cceac" }}>
                  Column Name
                </InputLabel>
                <Select
                  required
                  id="select-timeColumn"
                  label="Time Column"
                  value={params.timeColumn}
                  name="timeColumn"
                  onChange={handleChanges}
                  color="secondary"
                  sx={{
                    borderRadius: "5px",
                    width: "100%",
                  }}
                >
                  {columnsArray.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                {/* is this correct? */}
                <FormHelperText>Select column to monitor</FormHelperText>
              </FormControl>
            </Box>
            {/* INTERVAL AND PERIOD AND ENDING INPUT */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <FormControl sx={{ flex: 1, minWidth: "30%", mr: "1rem" }}>
                <TextField
                  required
                  id="interval"
                  label="Interval"
                  type="number"
                  name="interval"
                  value={params.interval}
                  onChange={handleChanges}
                  color="secondary"
                  sx={{ borderRadius: "5px", width: "100%" }}
                />
                <FormHelperText>monitoring interval</FormHelperText>
              </FormControl>
              <FormControl sx={{ flex: 1, minWidth: "30%", mr: "1rem" }}>
                <TextField
                  required
                  id="period"
                  label="Period"
                  type="text"
                  name="period"
                  value={params.period}
                  onChange={handleChanges}
                  color="secondary"
                  sx={{ borderRadius: "5px", width: "100%" }}
                />
                <FormHelperText>monitoring period</FormHelperText>
              </FormControl>
              <FormControl sx={{ flex: 1, minWidth: "30%" }}>
                <TextField
                  required
                  id="ending"
                  label="Ending"
                  type="text"
                  name="ending"
                  value={params.ending}
                  onChange={handleChanges}
                  color="secondary"
                  sx={{ borderRadius: "5px", width: "100%" }}
                />
                <FormHelperText>Select end point</FormHelperText>
              </FormControl>
            </Box>
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
              color="secondary"
              sx={{
                borderRadius: "5px",
                width: "100%",
              }}
            />
            <FormHelperText>Enter a description for the monitor</FormHelperText>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 3, mb: 2 }}
              size="small"
              color="secondary"
            >
              Submit
            </Button>
          </FormControl>
        </Card>
      </Box>
    </div>
  );
};

export default VolumeMonitor;
