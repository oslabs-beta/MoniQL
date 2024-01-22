import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Select, MenuItem} from "@mui/material"; 

const FocusBar = () => {
    const [focus, setFocus] = useState("");
    //     // depth: 0,
    //     // direction: "horizontal",
    // });


const handleFocus = (e) => {
    setFocus({ ...focus, focusItems: e.target.value });
}
const focusItems = useSelector((state) => state.diagram.data || []);

    return (
      <div className="FocusBar">
        <h1>SQL Visualizer</h1>
        <Select
          labelId="focus-select-label"
          label="Select Focus"
          id="focus-select"
          value={focus.focusItems}
          onChange={(e) => handleFocus(index, e.target.value)}
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
      </div>
    );
}

export default FocusBar;

