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
import { addAlertsActionCreator, addMonitorActionCreator } from "../actions/actions";

const MonitorContainer = () => {
  const dispatch = useDispatch();
  const [selectedMonitor, setSelectedMonitor] = useState("");
  const monitors = ["Range", "Freshness", "Volume", "Null", "Custom"];
  const activeMonitors = useSelector((state) => state.monitor.activeMonitors);
  const user_id = useSelector((state) => state.user.user_id);
  // useEffect(() => {
  //   console.log('new active monitors: ', activeMonitors);
  //   console.log('Type of activeMonitors:', typeof activeMonitors);
  //   console.log('Is activeMonitors an array:', Array.isArray(activeMonitors));
    
  //   if (activeMonitors.length > 0) {
  //     console.log('First monitor parameters:', activeMonitors[0].parameters);
  //   } else {
  //     console.log('activeMonitors is empty or not loaded');
  //   }
  // }, [activeMonitors]);
  useEffect(() => {
    const fetchAllMonitors = async () => {
      console.log('user_id in fetchAllMonitors in MonitorContainer', user_id);
      try {
        const response = await fetch('/getMonitors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({user_id: user_id})
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        dispatch(addMonitorActionCreator(data));
      } catch (error) {
        console.log('fetch error:', error);
      }
    };
  
    fetchAllMonitors();  
  }, []);


  const sendQuery = async (monitor) => {
    try {
      const path = `/${monitor.type}`;
      console.log('FIRED!', monitor.type, ' ', monitor.parameters)
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user_id,
          monitor: monitor
        })
      };
      const response = await fetch(path, requestOptions);
      const data = await response.json();
      console.log('data.alerts returned in sendQuery func in MonitorContainer', data)

      if (!response.ok) throw new Error(data.message || "Error from server");
      

      //below we will send the alert object to redux state with a dispatch/action
      if (data.alerts && data.alerts.length) {
        dispatch(addAlertsActionCreator(data.alerts));
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <Box>
    <Card
      variant="outlined"
      sx={{
        minWidth: "70vw",
        flexDirection: "column",
        minHeight: "60vh",
        padding: 3,
        boxShadow: 3,
        backgroundColor: "#2E2D3D",
        borderRadius: 4,
      }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" color="white">Your Monitors</Typography>
        <Button variant="contained" size="small">CREATE NEW MONITOR</Button>
      </Box>

      <Divider sx={{ width: "100%" }} />

      <Box sx={{ p: 2 }}>
        <Typography gutterBottom variant="body2" color="white">default monitors</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {monitors.map((monitor) => (
            <Chip
              key={monitor}
              label={monitor}
              color={selectedMonitor === monitor ? "primary" : "default"}
              onClick={() => setSelectedMonitor(monitor === selectedMonitor ? "" : monitor)}
            />
          ))}
        </Box>

        {/* Conditional Rendering for Monitors */}
        {selectedMonitor === "Range" && <RangeMonitor />}
        {selectedMonitor === "Freshness" && <FreshnessMonitor />}
        {selectedMonitor === "Volume" && <VolumeMonitor />}
        {selectedMonitor === "Null" && <NullMonitor />}
        {selectedMonitor === "Custom" && <CustomMonitor />}

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'flex-start' }}>
          {Array.isArray(activeMonitors) && activeMonitors.map((monitor, i) => (
            <Card key={i} sx={{ minWidth: 240, maxWidth: 240, mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{monitor.type}</Typography>
                {monitor.parameters && (
                  <List>
                    {Object.entries(monitor.parameters).map(
                      ([key, value], index) => (
                        <ListItem key={`${monitor.monitor_id}-${index}`}>
                          <strong>{key}:</strong> {value != null ? value.toString() : 'N/A'}
                        </ListItem>
                      )
                    )}
                  </List>
                )}
                <Button onClick={() => sendQuery(monitor)}>fire me</Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Card>
  </Box>
  );
};

export default MonitorContainer;


//Old styling for cards... I simplified it as part of debiugging but its 1am and I don't want to restyle rn :(

{/* <Stack direction="row" spacing={2}>
{activeMonitors.map((monitor, i) => (
 
  <Card key={i} sx={{ minWidth: 240 }}>
    <CardContent>
      <Typography variant="h6">{monitor.type}</Typography>
      <List>
        {Object.entries(monitor.parameters).map(
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
</Stack> */}