import { Typography, Box, useTheme } from "@mui/material";
import tokens from "./stylesheets/Themes";
import React from "react";

const SubHeader = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
        variant="h1"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

const ReportsHeader = () => {
  return (
    <div>
      <Box m="30px">
        <SubHeader
          title="Reports"
          subtitle="Some day this will be reports, right now it's alerts ¯\_(ツ)_/¯"
        />
      </Box>
    </div>
  );
};

export default ReportsHeader;
