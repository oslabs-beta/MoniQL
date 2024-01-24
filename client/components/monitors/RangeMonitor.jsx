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


const RangeMonitor = () => {
  const [params, setParams] = useState({
    table: '',
    column: '',
    min: '',
    max: '',
    frequency: '',
    description: ''
  });

const tablesArray = useSelector((state) => state.diagram.data);
const [columnsArray, setColumnsArray] = useState([]);

useEffect(() => {
  tablesArray.forEach((table, i) => {
    if (params.table === table.table_name){
      console.log("HIT!!!!! TABLE NAME SELECTED IS ", table.tablename)
      setColumnsArray(table.columns)
    }
  })
}, [params.table, tablesArray]);

//for editing monitors with existing rules
const handleChanges = (e) => {  
    console.log('THIS IS THE NAME OF THE DROPDOWNLIST',e.target.name, 'THIS IS THE VALUE THE USER CHOSE', e.target.value)
    setParams({ ...params, [e.target.name]: e.target.value });
}

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('this is params', params);
}

//Hi hay, if you're reading this its because I took a lunch and you didnt...
//This is the inputs we need on this component :

// ************************************************************************************************************
  // table name - dropdown (iterate through tablesArray on line 18 looking at table_name property), 
  // column name - dropdown (iterate through tablesArray on line 18, then iterate through columns (array))
  // min value - inpiut field
  // max value - input field
// ************************************************************************************************************

//We'll store this with a usestate here until we're ready to fire them off to the express server
// I made the use states for you already. you just need to hook them up to input fiels or whatever/

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
            <Typography variant="h5" color="white">Create New Monitor For Custom Ranges</Typography>
            <Divider />
          </Box>
          <Stack direction="column" spacing={1} alignItems="center" justifyContent="left">
            
            {/* TABLE SELECT */}
            <Select
              required
              id="select-table"
              value={params.table}
              name='table'
              onChange={handleChanges}
              sx={{ backgroundColor: "white", borderRadius: "5px", width: '30%' }}>
              {tablesArray.map((item, index) => (
                <MenuItem key={index} value={item.table_name}>{item.table_name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Select table to monitor</FormHelperText>

            {/* COLUMN SELECT */}
            <Select
              required
              id="select-column"
              value={params.column}
              name='column'
              onChange={handleChanges}
              sx={{ backgroundColor: "white", borderRadius: "5px", width: '30%' }}>
              {columnsArray.map((item, index) => (
                <MenuItem key={index} value={item}>{item}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Select column to monitor</FormHelperText>

            {/* Min Value Input */}
            <TextField
              required
              id="min-value"
              label="Min Value"
              type="number"
              name="min"
              value={params.min}
              onChange={handleChanges}
              sx={{ backgroundColor: "white", borderRadius: "5px", width: '30%' }}
            />
            <FormHelperText>Minimum Value</FormHelperText>

            {/* Max Value Input */}
            <TextField
              required
              id="max-value"
              label="Max Value"
              type="number"
              name="max"
              value={params.max}
              onChange={handleChanges}
              sx={{ backgroundColor: "white", borderRadius: "5px", width: '30%' }}
            />
            <FormHelperText>Maximum Value</FormHelperText>

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

export default RangeMonitor;




// const DogInputPage = () => {
//   const [dogData, setDogData] = useState({
//     name: "",
//     age: "",
//     weight: "",
//     breed: "",
//     meals: [],
//     medications: [],
//     groomers: [],
//     miscellaneous: [],
//     photo: null,
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     if (e.target.name.startsWith("meal-")) {
//       // Handle meal changes
//       const index = parseInt(e.target.name.split("-")[1], 10);
//       const field = e.target.name.split("-")[2];
//       handleMealChange(index, field, e.target.value);
//     } else {
//       setDogData({ ...dogData, [e.target.name]: e.target.value });
//     }
//   };

//   const handleMealChange = (index, field, value) => {
//     const newMeals = [...dogData.meals];
//     newMeals[index][field] = value;
//     setDogData({ ...dogData, meals: newMeals });
//   };

//   const handleAddMeal = () => {
//     const newMeal = { type: "", instructions: "", times: dayjs() };
//     setDogData({ ...dogData, meals: [...dogData.meals, newMeal] });
//   };

//   const handleRemoveMeal = (index) => {
//     const updatedMeals = dogData.meals.filter((_, i) => i !== index);
//     setDogData({ ...dogData, meals: updatedMeals });
//   };

//   const handleMealTypeChange = (index, value) => {
//     const updatedMeals = [...dogData.meals];
//     updatedMeals[index].type = value;
//     setDogData({ ...dogData, meals: updatedMeals });
//   };
