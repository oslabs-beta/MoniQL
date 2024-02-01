import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMonitorActionCreator } from "../../actions/actions";
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


const NullMonitor = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useState({
    table: '',
    frequency: '',
    description: ''
  });
  
const tablesArray = useSelector((state) => state.diagram.data);
const user = useSelector((state) => state.user.user);

const [columnsArray, setColumnsArray] = useState([]);

//for editing monitors with existing rules
const handleChanges = (e) => {  
    console.log('THIS IS THE NAME OF THE DROPDOWNLIST',e.target.name, 'THIS IS THE VALUE THE USER CHOSE', e.target.value)
    setParams({ ...params, [e.target.name]: e.target.value });
}

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("this is params", params);
  // const monitorObject = { type: "null", params: JSON.stringify(params) };
  const monitorObject = {type: 'null', user: user, params: params}
  try {
    const response = await fetch('/monitorObjects', {
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
      
      console.log('DATADATADATDATADATA',data);
      console.log('Data Parameters',data[0].parameters);
  
      dispatch(addMonitorActionCreator(data))
  
    } catch (error) {
      console.log('fetch error:', error);
    }
  }



return (
  <div>
    <Box display="flex" justifyContent="center" alignItems="center">
      <Card
        variant="outlined"
        sx={{
          width: "50vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 3,
          boxShadow: 3,
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          borderRadius: 4,
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h5" color="white">
              Create New Null Monitor
            </Typography>
            <Divider />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <FormControl sx={{ flex: 1, minWidth: "40%", mr: "1rem" }}>
              <InputLabel style={{ color: "hotpink" }}>Table Name</InputLabel>
            {/* TABLE SELECT */}
            <Select
              required
              id="select-table"
              value={params.table}
              name="table"
              onChange={handleChanges}
              sx={{
                backgroundColor: "white",
                borderRadius: "5px",
                width: "100%",
                color: "hotpink",
                  input: { color: "hotpink" },
              }}
            >
              {tablesArray.map((item, index) => (
                <MenuItem key={index} value={item.table_name}>
                  {item.table_name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select table to monitor</FormHelperText>
 </FormControl>
            {/* Frequency Input */}
            <FormControl sx={{ flex: 1, minWidth: "40%" }}>
            <TextField
              required
              id="frequency"
              label="Frequency (Hours)"
              type="number"
              name="frequency"
              value={params.frequency}
              onChange={handleChanges}
              sx={{
                backgroundColor: "white",
                borderRadius: "5px",
                width: "100%",
                input: { color: "hotpink" },
              }}
              InputLabelProps={{
                style: { color: "hotpink" },
              }}
              InputProps={{
                style: { color: "hotpink" },
              }}
            />
            <FormHelperText>
              Enter the frequency (in hours) for the monitor to run
            </FormHelperText>
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
              sx={{
                backgroundColor: "white",
                borderRadius: "5px",
                width: "100%",
                input: { color: "hotpink" },
              }}
              InputLabelProps={{
                style: { color: "hotpink" },
              }}
              InputProps={{
                style: { color: "hotpink" },
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
          >
            Submit
          </Button>
        </FormControl>
      </Card>
    </Box>
  </div>
);
}

export default NullMonitor;





// return (
//   <div>
//     <Box display="flex" justifyContent="center" alignItems="center">
//       <Card
//         variant="outlined"
//         sx={{
//           width: "50vw",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           padding: 3,
//           boxShadow: 3,
//           backgroundColor: "rgba(255, 255, 255, 0.7)",
//           borderRadius: 4,
//         }}
//       >
//         <FormControl sx={{ m: 1, minWidth: 200 }}>
//           <Box sx={{ p: 2 }}>
//             <Typography variant="h5" color="white">
//               Create New Null Monitor
//             </Typography>
//             <Divider />
//           </Box>
//           <Stack
//             direction="column"
//             spacing={1}
//             alignItems="center"
//             justifyContent="left"
//           >
//             {/* TABLE SELECT */}
//             <Select
//               required
//               id="select-table"
//               value={params.table}
//               name="table"
//               onChange={handleChanges}
//               sx={{
//                 backgroundColor: "white",
//                 borderRadius: "5px",
//                 width: "30%",
//               }}
//             >
//               {tablesArray.map((item, index) => (
//                 <MenuItem key={index} value={item.table_name}>
//                   {item.table_name}
//                 </MenuItem>
//               ))}
//             </Select>
//             <FormHelperText>Select table to monitor</FormHelperText>

//             {/* Frequency Input */}
//             <TextField
//               required
//               id="frequency"
//               label="Frequency (Hours)"
//               type="number"
//               name="frequency"
//               value={params.frequency}
//               onChange={handleChanges}
//               sx={{
//                 backgroundColor: "white",
//                 borderRadius: "5px",
//                 width: "30%",
//                 input: { color: "hotpink" },
//               }}
//               InputLabelProps={{
//                 style: { color: "hotpink" },
//               }}
//               InputProps={{
//                 style: { color: "hotpink" },
//               }}
//             />
//             <FormHelperText>
//               Enter the frequency (in hours) for the monitor to run
//             </FormHelperText>

//             {/* Description Input */}
//             <TextField
//               required
//               id="description"
//               label="Description"
//               multiline
//               rows={4}
//               name="description"
//               value={params.description}
//               onChange={handleChanges}
//               sx={{
//                 backgroundColor: "white",
//                 borderRadius: "5px",
//                 width: "100%",
//                 input: { color: "hotpink" },
//               }}
//               InputLabelProps={{
//                 style: { color: "hotpink" },
//               }}
//               InputProps={{
//                 style: { color: "hotpink" },
//               }}
//             />
//             <FormHelperText>Enter a description for the monitor</FormHelperText>
//           </Stack>
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             onClick={handleSubmit}
//             sx={{ mt: 3, mb: 2 }}
//             size="small"
//           >
//             Submit
//           </Button>
//         </FormControl>
//       </Card>
//     </Box>
//   </div>
// );
// }

// export default NullMonitor;