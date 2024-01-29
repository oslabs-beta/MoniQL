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
  NumberInput,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";


const RangeMonitor = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useState({
    table: '',
    column: '',
    minValue: '',
    maxValue: '',
    frequency: '',
    description: ''
  });

const tablesArray = useSelector((state) => state.diagram.data);
const [columnsArray, setColumnsArray] = useState([]);

useEffect(() => {
  tablesArray.forEach((table, i) => {
    if (params.table === table.table_name){
      console.log("HIT!!!!! TABLE NAME SELECTED IS ", table.tablename)
      const numColumns = table.columns.filter(column => column.data_type === 'integer' || column.data_type === 'numeric').map(column => column.name)
      setColumnsArray(numColumns)
    }
  })
}, [params.table, tablesArray]);

//for editing monitors with existing rules
// const handleChanges = (e) => {  
//     console.log('THIS IS THE NAME OF THE DROPDOWNLIST', e.target.name, 'THIS IS THE VALUE THE USER CHOSE', e.target.value)
//     setParams({ ...params, [e.target.name]: e.target.value });
// }

const handleChanges = (e) => {  
  const { name, value } = e.target;

  // Check if the input name is 'min' or 'max' and convert the value to a number
  const newValue = (name === 'minValue' || name === 'maxValue') ? Number(value) : value;

  console.log('THIS IS THE NAME OF THE DROPDOWNLIST', name, 'THIS IS THE VALUE THE USER CHOSE', newValue);
  setParams({ ...params, [name]: newValue });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('this is params', params);
  const monitorObject = {type: 'range', params: params}
  dispatch(addMonitorActionCreator(monitorObject))
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
              Create New Monitor For Custom Ranges
            </Typography>
            <Divider />
          </Box>
          
            {/* TABLE SELECT */}
             <Box display="flex" justifyContent="space-between">
            <FormControl sx={{ flex: 1, minWidth: "40%", mr: "1rem" }}>
              <InputLabel style={{ color: "hotpink" }}>Table Name</InputLabel>

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
            {/* COLUMN SELECT */}
              <FormControl sx={{ flex: 1, minWidth: "40%" }}>
              <InputLabel
                style={{ color: "hotpink" }}
                InputProps={{
                  style: { color: "hotpink" },
                }}
              >
                Column Name
              </InputLabel>
            <Select
              required
              id="select-column"
              value={params.column}
              name="column"
              onChange={handleChanges}
              sx={{
                backgroundColor: "white",
                borderRadius: "5px",
                width: "100%",
             color: "hotpink",
                  input: { color: "hotpink" },
                }}
              >
              {columnsArray.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select column to monitor</FormHelperText>
 </FormControl>
          </Box>
            {/* Min Value Input */}
              <Box display="flex" justifyContent="space-between">
            <FormControl sx={{ flex: 1, minWidth: "30%", mr: "1rem" }}>
            <TextField
              required
              id="min-value"
              label="Min Value"
              type="number"
              name="minValue"
              value={params.minValue}
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
            <FormHelperText>Minimum Value</FormHelperText>
          </FormControl>

            <FormControl sx={{ flex: 1, minWidth: "30%", mr: "1rem" }}>
            {/* Max Value Input */}
            <TextField
              required
              id="max-value"
              label="Max Value"
              type="number"
              name="maxValue"
              value={params.maxValue}
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
            <FormHelperText>Maximum Value</FormHelperText>
 </FormControl>

            <FormControl sx={{ flex: 1, minWidth: "30%" }}>
            {/* Frequency Input */}
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
