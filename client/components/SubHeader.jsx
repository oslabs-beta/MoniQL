import { Typography, Box, useTheme } from "@mui/material";
import tokens from "./stylesheets/Themes";
import React from "react";
const theme = createTheme({
  typography: {
    fontFamily: ['Hanken Grotesk', 'sans-serif'].join(','),
    fontWeight: 800,
  },
  palette: {
    primary: {
      main: '#766ffc',
    },
    secondary: {
      main: '#B5B8CB',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          padding: 15,
        },
      },
    },
  },
});
const SubHeader = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px" sx={{ mt: -3, mb: -3, mr: -3, ml: -3 }}>
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      {/* <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography> */}
    </Box>
  );
};

export default SubHeader;
