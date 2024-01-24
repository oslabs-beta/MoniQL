import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";


const CustomMonitor = () => {
  const [params, setParams] = useState({
    table: '',
    frequency: '',
    description: ''
  });
  
const tablesArray = useSelector((state) => state.diagram.data);
const [columnsArray, setColumnsArray] = useState([]);

//for editing monitors with existing rules
const handleChanges = (e) => {  
    console.log('THIS IS THE NAME OF THE FIELD',e.target.name, 'THIS IS THE VALUE THE USER CHOSE', e.target.value)
    setParams({ ...params, [e.target.name]: e.target.value });
}

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('this is params', params);
}

return (
  <div>
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card
        variant="outlined"
        sx={{ width: "50vw", display: "flex", flexDirection: "column",
              justifyContent: "center", padding: 3, boxShadow: 3,
              backgroundColor: "rgba(255, 255, 255, 0.7)", borderRadius: 4 }}>
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h5" color="white">Create New Custom Monitor</Typography>
            <Divider />
          </Box>
          <Stack direction="column" spacing={1} alignItems="center" justifyContent="left">
            

            {/* Frequency Input */}
            <TextField
              required
              id="frequency"
              label="Frequency (Hours)"
              type="number"
              name="frequency"
              value={params.frequency}
              onChange={handleChanges}
              sx={{ backgroundColor: "white", borderRadius: "5px", width: '30%' }}
            />
            <FormHelperText>Enter the frequency (in hours) for the monitor to run</FormHelperText>
            
            {/* Custom Query Input */}
            <TextField
              required
              id="query"
              label="Query"
              multiline
              rows={4}
              name="query"
              value={params.description}
              onChange={handleChanges}
              sx={{ backgroundColor: "white", borderRadius: "5px", width: '100%' }}
            />
            <FormHelperText>Enter your custom query string to monitor</FormHelperText>

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
              sx={{ backgroundColor: "white", borderRadius: "5px", width: '100%' }}
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

export default CustomMonitor;
