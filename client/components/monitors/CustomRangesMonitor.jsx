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
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// import {
//   selectTableActionCreator,
//   selectDepthActionCreator,
// } from "../actions/actions"; 


const CustomRangesMonitor = () => {
  
  const [customRangesData, setCustomRangesData] = useState({
    table: '',
    column: '',
    min: -Infinity,
    max: Infinity
  });


const tablesArray = useSelector((state) => state.diagram.data);
// const columnsArray = useEffect((state) => state.diagram.data);
const [columnsArray, setColumnsArray] = useState([]);

useEffect(() => {
  
  tablesArray.forEach((table, i) => {
    if (customRangesData.table === table.table_name){
      setColumnsArray(table.columns)
    }
  })
  
  console.log(columnsArray)
}, [customRangesData.table]);


//go back to monitor page (use dispatch?)
//const navigate = useNavigate();

//for editing monitors with existing rules
const handleChanges = (e) => {  
    console.log('THIS IS THE NAME OF THE DROPDOWNLIST',e.target.name, 'THIS IS THE VALUE THE USER CHOSE', e.target.value)
    //  setCustomRangesData({ ...customRangesData, [e.target.name]: e.target.value });
}

const handleSubmit = async (e) => {
  e.preventDefault();
  // console.log('this is customRangesData', customRangesData);
  // setCustomRangesData({
  //   table: ,
  //   column:
  //   min:
  //   max:
  // })
  
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Card
          variant="outlined"
          sx={{
            width: "50vw",
            display: "flex",
            flexDirection: "column",
            //   alignItems: "center",
            justifyContent: "center",
            padding: 3,
            boxShadow: 3,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: 4, //transparent
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h5" color="white">
                Monitor Ranges
              </Typography>
              <Divider />
            </Box>
            <Stack
              direction="column"
              spacing={1}
              alignItems="center"
              justifyContent="left"
            >
              {/* tables */}
              {/* <InputLabel id="select-table-label">Select Table</InputLabel> */}
              <Select
                required
                // labelId="select-table-label"
                // label="Select Table"
                id="select-table"
                value={customRangesData.table}
                name='table'
                onChange={handleChanges}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                }}
              >
                {tablesArray.map((item, index) => (
                  <MenuItem key={index} value={item.table_name}>
                    {item.table_name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select table to monitor</FormHelperText>

              {/* columns */}
              <Select
                required
                labelId="select-column-label"
                label="Select Column"
                id="select-column"
                // value={column}
                onChange={(e) => handleColumn(e.target.value)}
                //ongChange={handleFocus}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                }}
              >
                {columnsArray.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select column to monitor</FormHelperText>

              {/* //SEL MIN */}
              <Select
                required
                labelId="select-min-label"
                label="Depth"
                id="depth-select"
                // value={depth}
                onChange={(e) => handleDepth(e.target.value)}
                //ongChange={handleFocus}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                }}
              >
                {/* {depthOptions.map((depthOptions, index) => (
                  <MenuItem key={index} value={depthOptions}>
                    {depthOptions}
                  </MenuItem>
                ))} */}
              </Select>
              <FormHelperText>Min range</FormHelperText>

              {/* //SEL MAX */}
              <Select
                labelId="select-max-label"
                label="Depth"
                id="depth-select"
                // value={depth}
                onChange={(e) => handleDepth(e.target.value)}
                //ongChange={handleFocus}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                }}
              >
                {/* {depthOptions.map((depthOptions, index) => (
                  <MenuItem key={index} value={depthOptions}>
                    {depthOptions}
                  </MenuItem>
                ))} */}
              </Select>
              <FormHelperText>Max range</FormHelperText>
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

export default CustomRangesMonitor




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
