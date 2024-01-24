import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux'
import { Box, Card, Chip, Container, Button, Divider, Stack, Typography } from '@mui/material';
import RangeMonitor from '../components/monitors/RangeMonitor';
import FreshnessMonitor from '../components/monitors/FreshnessMonitor';
import VolumeMonitor from '../components/monitors/VolumeMonitor';
import CustomMonitor from '../components/monitors/CustomMonitor';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NullMonitor from '../components/monitors/NullMonitor';


const MonitorContainer = () => {
  const [selectedMonitor, setSelectedMonitor] = useState('');
  const monitors = ['Range', 'Freshness', 'Volume', 'Null', 'Custom'];
  const activeMonitors = useSelector((state) => state.monitor.activeMonitors);
  useEffect(() => {
    console.log("ACTIVE MONITORS HAS CHANGED!!",activeMonitors)
  }, [activeMonitors])
    return (
    
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="flex-start"
          minHeight="50vh"
          spacing={1}
        >
          <Card
            variant="outlined"
            height="80vh"
            sx={{
              width: "50vw",
              display: "flex",
              flexDirection: "column",
              minHeight: "80vh",
              //   alignItems: "center",
              justifyContent: "flex-start",
              padding: 3,
              boxShadow: 3,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
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
            <Box sx={{ p: 2}}>
              <Typography gutterBottom variant="body2" color="white">
                default monitors
              </Typography>
              {/* array of buttons to edit monitor */}
              <Stack direction="row" spacing={1}>
                {monitors.map(monitor => (
                  <Chip
                    key={monitor}
                    label={monitor}
                    color={selectedMonitor === monitor ? 'primary' : 'default'}
                    onClick={() => setSelectedMonitor(monitor)}
                  />
                ))}
              </Stack>
            {
              activeMonitors.map((monitor, i) => <Card key={i}>{monitor.type}</Card>)
            }
            </Box>
            {/* Conditional Rendering for Monitors */}
            {selectedMonitor === 'Range' && <RangeMonitor />}
            {selectedMonitor === 'Freshness' && <FreshnessMonitor />}
            {selectedMonitor === 'Volume' && <VolumeMonitor />}
            {selectedMonitor === 'Null' && <NullMonitor />}
            {selectedMonitor === 'Custom' && <CustomMonitor />}
          </Card>
        </Box>
     
    );

}



export default MonitorContainer;