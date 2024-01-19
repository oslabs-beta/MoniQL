import * as React from "react";
import { Box, Container } from "@mui/material";

const ErdVisualizerContainer = () => {
  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        sx={{
            border: "pink",
          position: "fixed",
          top: "0",
          marginLeft: "240px",
          width: "calc(100% - 240px)",
          height: "100vh",
          backgroundColor: "gray",
        }}
      ></Box>
    </div>
  );
};

export default ErdVisualizerContainer;
