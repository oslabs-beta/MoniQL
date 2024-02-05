import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  useTheme,
  Select,
  MenuItem,
  Typography,
  createTheme,
  ThemeProvider,
  InputLabel,
  FormHelperText,
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
  NativeSelect,
} from '@mui/material';
import {
  selectTableActionCreator,
  selectDepthActionCreator,
} from '../actions/actions';
import tokens from './stylesheets/Themes';

//////////////////////import subheader/////////////////////
// import SubHeader from "./SubHeader";
const SubHeader = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
        variant="h1"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: '0 0 5px 0' }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};
// export default SubHeader;
//////////////////////import subheader/////////////////////

const FocusBar = () => {
  ////////////DLT AFTER IMPORTING SUBHEADER////////////////
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  ////////////DLT AFTER IMPORTING SUBHEADER////////////////

  const [focus, setFocus] = useState('');
  const [depth, setDepth] = useState('');
  const [depthOptions, setDepthOptions] = useState([]);
  // const [direction, setDirection] = useState("");
  const tablesWeightsObj = useSelector((state) => state.diagram.tablesWeightsObj);
  const dispatch = useDispatch();

  const handleFocus = (tableName) => {
    console.log('new focus in handleFocus in FocusBar: ', tableName);
    setFocus(tableName);
    dispatch(selectTableActionCreator(tableName));
  };

  const focusItems = useSelector((state) => state.diagram.data || []);

  const handleDepth = (num) => {
    console.log(num);
    setDepth(num);
    dispatch(selectDepthActionCreator(num));
  };

  //fix this please
  // const depthOptions = Array.from({ length: 7 }, (_, i) => i);
  // const directionSet = useSelector((state) => state.diagram.direction || "horizontal");

  useEffect(() => {
    if(!focus) return;
    setDepthOptions(Array.from({ length: tablesWeightsObj[focus] + 1}, (_, i) => i));
  }, [focus]);

  return (
    <div className="FocusBar">
      {/* <ThemeProvider theme={theme}> */}
      {/* //PAGE HEADER */}
      {/* <Typography>SQL Visualizer</Typography> */}
      <Box m="30px">
        <SubHeader
          title="SQL Visualizer"
          subtitle="Visualize your SQL database  ฅV●ᴥ●Vฅ"
        />
        <Box sx={{ display: 'flex', flexDirection: 'row', minWidth: 120 }}>
          <FormControl sx={{ mr: 4, minWidth: 350 }}>
            <InputLabel>Table Name</InputLabel>
            <Select
              label="table name"
              value={focus}
              onChange={(e) => handleFocus(e.target.value)}
              sx={{
                backgroundColor: '#2E2D3D',
                borderRadius: '5px',
              }}
            >
              {focusItems.map((item, index) => (
                <MenuItem key={index} value={item.table_name}>
                  {item.table_name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select table name to focus on</FormHelperText>
          </FormControl>
          <FormControl sx={{ mr: 3, minWidth: 90 }}>
            <InputLabel>Depth</InputLabel>
            <Select
              label="Depth"
              value={depth}
              onChange={(e) => handleDepth(e.target.value)}
              sx={{
                backgroundColor: '#2E2D3D',
                borderRadius: '5px',
              }}
            >
              {depthOptions.map((depthOptions, index) => (
                <MenuItem key={index} value={depthOptions}>
                  {depthOptions}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select Depth</FormHelperText>
          </FormControl>
          <FormGroup sx={{ m: 1, minWidth: 80 }}>
            <FormControlLabel
              control={<Switch defaultChecked color="thurdary" />}
              label="Portrait View"
            />
          </FormGroup>
        </Box>
      </Box>
      {/* </ThemeProvider> */}
    </div>
  );
};

export default FocusBar;
