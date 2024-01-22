import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {Select, MenuItem} from "@mui/material";
import { selectTableActionCreator, selectDepthActionCreator } from '../actions/actions'; 

const FocusBar = () => {
    const [focus, setFocus] = useState("");
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

        {/* //PAGE HEADER */}
        <h1>SQL Visualizer</h1>

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

      </div>
    );
}

export default FocusBar;

