import * as React from "react";
import { Box, Container } from "@mui/material";
import ErdVisualizer from "../components/ErdVisualizer";
import FocusBar from "../components/FocusBar";  

const ErdVisualizerContainer = () => {
  return (
    <div>
      <FocusBar />
      <Box
        display="flex"
        justifyContent="center"
        sx={{
            border: "pink",
          position: "fixed",
          marginLeft: "200px",
          top: "50px",
          width: "calc(99% - 150px)",
          height: "100vh",
          backgroundColor: "DarkSlateGray",
          zIndex: 1,
        }}
      >
      <ErdVisualizer/>
      </Box>
    </div>
  );
};

export default ErdVisualizerContainer;