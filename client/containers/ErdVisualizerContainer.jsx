import * as React from "react";
import { Box, Container } from "@mui/material";
import ErdVisualizer from "../components/ErdVisualizer";

const ErdVisualizerContainer = () => {
  return (
    <div>
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
          backgroundColor: "tan",
          zIndex: 1,
        }}
      >
      <ErdVisualizer/>
      </Box>
    </div>
  );
};

export default ErdVisualizerContainer;
