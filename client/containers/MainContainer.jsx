import * as React from "react";
import { Box, Container } from "@mui/material";
import Focus from "../components/Focus";
import FocusBar from "../components/FocusBar";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
// import { theme1, theme2 } from "../public/styles/theme";

const MainContainer = () => {
  return (
    <div>
      {/* <ThemeProvider theme={isThemeLight ? lightTheme : darkTheme}> */}
      <Box display="flex" flexDirection="row">
        {/* <SideBar /> */}
        {/* <Header /> */}
      </Box>
      <Box
        component="main"
        display="flex"
        justifyContent="center"
        sx={{
          flexGrow: 1,
          p: 3,
          height: "100vh",
          backgroundColor: "#222130",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "15px",
            zIndex: 2,
          }}
        >
          {/* <FocusBar /> */}
        </Box>
        {/* <Focus /> */}
      </Box>
      {/* </div> */}
      {/* </ThemeProvider> */}
    </div>
  );
};

export default MainContainer;
