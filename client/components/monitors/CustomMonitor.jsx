// React imports
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Action creators
import { addMonitorsActionCreator } from '../../actions/actions';

// MUI components
import {
  Box,
  Card,
  Button,
  Divider,
  InputLabel,
  FormControl,
  FormHelperText,
  Stack,
  Typography,
  MenuItem,
  Select,
  TextField,
  useTheme
} from '@mui/material';
import tokens from '../stylesheets/Themes';

// MUI icons
import AddCircleIcon from '@mui/icons-material/AddCircle';
import monitorObjectCreator from './monitorObjectCreator';


const CustomMonitor = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useState({
    table: 'custom query table(s)',
    frequency: '',
    description: ''
  });
  //color themes
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const tablesArray = useSelector((state) => state.diagram.data);
  const user_id = useSelector((state) => state.user.user_id);
  const [columnsArray, setColumnsArray] = useState([]);

  //for editing monitors with existing rules
  const handleChanges = (e) => {
    // console.log('THIS IS THE NAME OF THE FIELD',e.target.name, 'THIS IS THE VALUE THE USER CHOSE', e.target.value)
    setParams({ ...params, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('params in customMonitor', params);
    const monitorObject = monitorObjectCreator('Custom', user_id, params);

    //make post request to server
    try {
      const response = await fetch('/monitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      console.log('fetch error: ', error);
    }
  }

  return (
    <div>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Card
          variant="outlined"
          sx={{
            width: '25vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 3,
            boxShadow: 3,
            borderRadius: 4,
            backgoundColor: '#6870fa',
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h5" color={colors.grey[100]} sx={{ mb: 1 }}>
                Create New Custom Monitor
              </Typography>
              <Divider />
            </Box>
            <Stack
              direction="column"
              spacing={1}
              alignItems="center"
              justifyContent="left"
            >
              {/* Frequency Input */}
              <TextField
                required
                id="frequency"
                label="Frequency (Hours)"
                type="number"
                name="frequency"
                value={params.frequency}
                onChange={handleChanges}
                color="secondary"
                sx={{
                  borderRadius: '5px',
                  width: '60%',
                  // backgroundColor: 'rgba(255, 255, 255, 0.7)'
                }}
              />
              <FormHelperText>
                Enter the frequency (in hours) for the monitor to run
              </FormHelperText>

              {/* Custom Query Input */}
              <TextField
                required
                id="query"
                label="Query"
                multiline
                rows={4}
                name="query"
                value={params.query}
                onChange={handleChanges}
                color="secondary"
                sx={{
                  borderRadius: '5px',
                  width: '100%',
                }}
              />
              <FormHelperText>
                Enter your custom query string to monitor (Structure your query
                so that it will only return anomalous rows)
              </FormHelperText>

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
                  // bakgroundColor: 'white',
                  borderRadius: '5px',
                  width: '100%',
                }}
              />
              <FormHelperText>
                Enter a description for the monitor
              </FormHelperText>
            </Stack>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 3, mb: 2 }}
              size="small"
              disabled={!params.frequency}
              color="secondary"
            >
              Submit
            </Button>
          </FormControl>
        </Card>
      </Box>
    </div>
  );
}

export default CustomMonitor;
