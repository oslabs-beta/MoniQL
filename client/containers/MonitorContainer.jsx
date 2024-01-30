import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Card,
  Chip,
  Container,
  Button,
  Divider,
  Stack,
  Typography,
  CardContent,
  List,
  ListItem,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RangeMonitor from "../components/monitors/RangeMonitor";
import FreshnessMonitor from "../components/monitors/FreshnessMonitor";
import VolumeMonitor from "../components/monitors/VolumeMonitor";
import CustomMonitor from "../components/monitors/CustomMonitor";
import NullMonitor from "../components/monitors/NullMonitor";
import { addAlertsActionCreator } from "../actions/actions";

const MonitorContainer = () => {
  const dispatch = useDispatch();
  const [selectedMonitor, setSelectedMonitor] = useState("");
  const monitors = ["Range", "Freshness", "Volume", "Null", "Custom"];
  const activeMonitors = useSelector((state) => state.monitor.activeMonitors);
  useEffect(() => {
    // console.log('new active monitors: ', activeMonitors)
  }, [activeMonitors])

  const sendQuery = async (monitor) => {
    try {
      const path = `/${monitor.type}`;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(monitor.params),
      };
      const response = await fetch(path, requestOptions);
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Error from server");
      

      //below we will send the alert object to redux state with a dispatch/action
      if (data.alerts.length) {
        dispatch(addAlertsActionCreator(data.alerts));
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <Box

    // sx={{ml: 20}}

    // display="flex"
    // justifyContent="flex-start"
    // alignItems="flex-start"
    // spacing={1}
    >
      <Card
        variant="outlined"
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
        sx={{
          minWidth: "70vw",
          display: "flex",
          flexDirection: "column",
          minHeight: "60vh",
          //   alignItems: "center",
          // justifyContent: "flex-start",
          padding: 3,
          boxShadow: 3,

          backgroundColor: "#2E2D3D",
          borderRadius: 4, //transparent
        }}
      >
        <Box sx={{ p: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
          >
            <Typography variant="h5" color="white">
              Your Monitors
            </Typography>
            {/* create mew monitor button */}
            <Button variant="contained" size="small">
              CREATE NEW MONITOR
            </Button>
          </Stack>
        </Box>
        <Divider variant="middle" style={{ width: "100%" }} />
        <Box sx={{ p: 2 }}>
          <Typography gutterBottom variant="body2" color="white">
            default monitors
          </Typography>
          {/* array of buttons to edit monitor */}
          <Stack direction="row" spacing={1} sx={{ m: 2, mb: 3 }}>
            {monitors.map((monitor) => (
              <Chip
                key={monitor}
                label={monitor}
                color={selectedMonitor === monitor ? "primary" : "default"}
                onClick={() =>
                  monitor === selectedMonitor
                    ? setSelectedMonitor("")
                    : setSelectedMonitor(monitor)
                }
              />
            ))}
          </Stack>
          {/* Conditional Rendering for Monitors */}
          {selectedMonitor === "Range" && <RangeMonitor />}
          {selectedMonitor === "Freshness" && <FreshnessMonitor />}
          {selectedMonitor === "Volume" && <VolumeMonitor />}
          {selectedMonitor === "Null" && <NullMonitor />}
          {selectedMonitor === "Custom" && <CustomMonitor />}

          <Box sx={{ overflowX: "auto" }}>
            <Stack direction="row" spacing={2}>
              {activeMonitors.map((monitor, i) => (
                <Card key={i} sx={{ minWidth: 240 }}>
                  <CardContent>
                    <Typography variant="h6">{monitor.type}</Typography>
                    <List>
                      {Object.entries(monitor.params).map(
                        ([key, value], index) => (
                          <ListItem key={index}>
                            <strong>{key}:</strong> {value.toString()}
                          </ListItem>
                        )
                      )}
                    </List>
                    <Button onClick={() => sendQuery(monitor)}>fire me</Button>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default MonitorContainer;
