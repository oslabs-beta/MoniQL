import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Card,
  Chip,
  Button,
  Divider,
  Typography,
  CardContent,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from '@mui/material';
import tokens from '../components/stylesheets/Themes';
import RangeMonitor from '../components/monitors/RangeMonitor';
import FreshnessMonitor from '../components/monitors/FreshnessMonitor';
import VolumeMonitor from '../components/monitors/VolumeMonitor';
import CustomMonitor from '../components/monitors/CustomMonitor';
import NullMonitor from '../components/monitors/NullMonitor';
import { addAlertsActionCreator } from '../actions/actions';
import { updateMonitorActionCreator } from '../actions/actions';

//for editing
import MonitorEditor from '../components/monitors/MonitorEditor';
const MonitorContainer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const [selectedMonitor, setSelectedMonitor] = useState('');
  const monitors = ['Range', 'Freshness', 'Volume', 'Null', 'Custom'];
  const activeMonitors = useSelector((state) => state.monitor.activeMonitors);
  const displayMonitors = useSelector((state) => state.monitor.displayMonitors);
  const user_id = useSelector((state) => state.user.user_id);

  //*** for editing monitors with existing rules ***//
  const [editingMonitor, setEditingMonitor] = useState(null);
  const [newActiveMonitors, setNewActiveMonitors] = useState(activeMonitors);

  // const handleSaveChanges = (updatedMonitor) => {
  //   setActiveMonitors((prevMonitors) =>
  //     prevMonitors.map((monitor) =>
  //       monitor.monitor_id === updatedMonitor.monitor_id
  //         ? updatedMonitor
  //         : monitor
  //     )
  //   );
  //   // Exit the editing mode
  //   setEditingMonitor(null);
  // };

  const handleSaveChanges = (updatedMonitor) => {
    setNewActiveMonitors((prevMonitors) =>
      prevMonitors.map((monitor) =>
        monitor.monitor_id === updatedMonitor.monitor_id
          ? updatedMonitor
          : monitor
      )
    );
    updateMonitorQuery(updatedMonitor);
    // Exit the editing mode
    setEditingMonitor(null);
  };

  const updateMonitorQuery = async (monitorObj) => {
    try {
      const response = await fetch('/monitors', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(monitorObj),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedMonitorObj = await response.json();
      console.log('updatedMonitorObj in monitoreditor: ', updatedMonitorObj);
      dispatch(updateMonitorActionCreator(updatedMonitorObj[0]));
    } catch (error) {
      console.error('Error updating monitor', error);
    }
  };

  //*** for editing monitors with existing rules ***//

  const sendQuery = async (monitor) => {
    try {
      const path = `/${monitor.type}`;
      console.log('FIRED!', monitor.type, ' ', monitor.parameters);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user_id,
          monitor: monitor,
        }),
      };
      const response = await fetch(path, requestOptions);
      const data = await response.json();
      console.log(
        'data.alerts returned in sendQuery func in MonitorContainer',
        data.alerts
      );

      if (!response.ok) throw new Error(data.message || 'Error from server');

      //below we will send the alert object to redux state with a dispatch/action
      if (data.alerts && data.alerts.length) {
        dispatch(addAlertsActionCreator(data.alerts));
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  
  useEffect(() => {
    setSelectedMonitor('');
  }, [activeMonitors]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginLeft: '10px'
      }}
    >
      <Card className='card-container'
        variant='outlined'
        sx={{
          minWidth: '30vw',
          flexDirection: 'column',
          minHeight: '60vh',
          padding: 3,
          boxShadow: 3,
          backgroundColor: '#2E2D3D',
          borderRadius: 4,
          
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5" color={colors.grey[100]}>
            Active Monitors
          </Typography>
        </Box>
        <Divider sx={{ width: '100%', mb: 1 }} />
        <Box
          sx={
            {
              // display: "flex",
              // flexWrap: "wrap",
            }
          }
        >
          {Array.isArray(activeMonitors) &&
            displayMonitors.map((monitor, i) => (
              <Card 
                key={i}
                sx={{
                  minWidth: 500,
                  maxWidth: 140,
                  m: 1,
                  overflow: 'auto',
                  maxHeight: '20vh',
                }}
              >
                <CardContent>
                  {editingMonitor === monitor ? (
                    <MonitorEditor
                      monitor={editingMonitor}
                      onDone={handleSaveChanges}
                    />
                  ) : (
                    <>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'row',
                        }}
                      >

                        <Typography fontSize='16px' color={colors.grey[100]}>
                          table:{' '}
                          <Typography
                            fontSize='19px'
                            color="secondary"
                            display="inline"
        >
                            {monitor.parameters.table}
                          </Typography>{' '}
                          | type:{' '}
                          <Typography

                            fontSize='19px'
                            color="secondary"
                            display="inline"

                          >
                            {monitor.type}
                          </Typography>
                          </Typography>
                        <Box>

                          <Button onClick={() => setEditingMonitor(monitor)}>
                            Edit

                          </Button>
                          <Button onClick={() => sendQuery(monitor)}>
                            fire me
                          </Button>

                        </Box>

                      </Box>
                      <Divider sx={{ width: '100%' }} />
                      {/* logic to go into monitor editor */}

                      {monitor.parameters && (
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          {Object.entries(monitor.parameters).map(
                            ([key, value], index) => {
                              if (index === 0) return null;

                              return (
                                <React.Fragment
                                  key={`${monitor.monitor_id}-${index}`}
                                >
                                  {index !== 1 && (
                                    <Divider orientation='vertical' flexItem />
                                  )}
                                  <ListItem>
                                    <ListItemText
                                      primary={`${key}: ${
                                        value != null ? value.toString() : 'N/A'
                                      }`}
                                    />
                                  </ListItem>
                                </React.Fragment>
                              );
                            }
                          )}
                        </Box>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
        </Box>
      </Card>

      <Box sx={{ p: 2, marginTop: '-15px' }}>
        {/* Conditional Rendering for Monitors */}
        <Card className='card-container'
          variant='outlined'
          sx={{
            minWidth: '30vw', // Adjust this as needed
            flexDirection: 'column',
            minHeight: '20vh',
            padding: 3,
            boxShadow: 3,
            backgroundColor: '#2E2D3D',
            borderRadius: 4,
          }}
        >
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>

            <Typography variant='h5' color={colors.grey[100]}>
              Create New Monitor
            </Typography>
          </Box>
          <Divider sx={{ width: '100%' }} />
          {/* Conditional Rendering for Monitors and Editor */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, margin: 3 }}>
            {monitors.map((monitor) => (
              <Chip
                key={monitor}
                label={monitor}
                color={selectedMonitor === monitor ? 'secondary' : 'default'}
                onClick={() =>
                  setSelectedMonitor(monitor === selectedMonitor ? '' : monitor)
                }
              />
            ))}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {selectedMonitor === 'Range' && <RangeMonitor />}
            {selectedMonitor === 'Freshness' && <FreshnessMonitor />}
            {selectedMonitor === 'Volume' && <VolumeMonitor />}
            {selectedMonitor === 'Null' && <NullMonitor />}
            {selectedMonitor === 'Custom' && <CustomMonitor />}
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default MonitorContainer;
