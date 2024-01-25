import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {Select, MenuItem, Typography, createTheme, ThemeProvider } from "@mui/material";
import { selectTableActionCreator, selectDepthActionCreator } from '../actions/actions'; 


const focusBarTheme = createTheme({
  typography: {
    fontFamily: "Roboto",
  },
  palette: {
    primary: {
      main: "#6a994e",
      light: "#42a5f5",
      dark: "#1565c0",
    },
    secondary: {
      main: "#9c6644",
      light: "#42a5f5",
      dark: "#1565c0",
    },
  },
});

const FocusBar = () => {
    const [focus, setFocus] = useState('');
    const [depth, setDepth] = useState(0);
    // const [direction, setDirection] = useState("");
    const dispatch = useDispatch();


    const handleFocus = (tableName) => {
      console.log(tableName);
      setFocus(tableName);
      dispatch(selectTableActionCreator(tableName))
    }

    const focusItems = useSelector((state) => state.diagram.data || []);

    const handleDepth = (num) => {
      console.log(num);
      setDepth(num);
      dispatch(selectDepthActionCreator(num))
    }

    //fix this please
    const depthOptions = Array.from({length: 7}, (_, i) => i);
    // const directionSet = useSelector((state) => state.diagram.direction || "horizontal");


    return (
      <div className="FocusBar">
        <ThemeProvider theme={focusBarTheme}>
          {/* //PAGE HEADER */}
          <Typography>SQL Visualizer</Typography>
          {/* //FOCUS SELECT */}

          <Select
            labelId="focus-select-label"
            label="Select Focus"
            id="focus-select"
            value={focus}
            onChange={(e) => handleFocus(e.target.value)}
            //ongChange={handleFocus}
            sx={{
              backgroundColor: "white",
              borderRadius: "5px",
            }}
          >
            {focusItems.map((item, index) => (
              <MenuItem key={index} value={item.table_name}>
                {item.table_name}
              </MenuItem>
            ))}
          </Select>

          {/* //DEPTH SELECT */}
          <Select
            labelId="depth-select-label"
            label="Depth"
            id="depth-select"
            value={depth}
            onChange={(e) => handleDepth(e.target.value)}
            //ongChange={handleFocus}
            sx={{
              backgroundColor: "white",
              borderRadius: "5px",
            }}
          >
            {depthOptions.map((depthOptions, index) => (
              <MenuItem key={index} value={depthOptions}>
                {depthOptions}
              </MenuItem>
            ))}
          </Select>
        </ThemeProvider>
      </div>
    );
}

export default FocusBar;