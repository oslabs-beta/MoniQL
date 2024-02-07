import {
  Typography,
  Box,
  useTheme,
  Divider,
  Chip,
  FormControl,
  FormHelperText
} from "@mui/material";
import tokens from "./stylesheets/Themes";
import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { updateDashDisplayTimeRangeActionCreator } from "../actions/actions";

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

const DashboardHeader = () => {
  const dispatch = useDispatch();
  const dashDisplayAlertsTimeRangeFromState = useSelector(
    (state) => state.diagram.dashDisplayAlertsTimeRange
  );
  const dashDisplayAlertsTimeRangeAsDayjs =
    dashDisplayAlertsTimeRangeFromState.map((date) => dayjs(date));
  const [dashDisplayAlertsTimeRange, setDashDisplayAlertsTimeRange] = useState(
    dashDisplayAlertsTimeRangeAsDayjs
  );

  const handleDashDisplayAlertsTimeRange = (timeRangeArr) => {
    const timeRangeArrAsTimestamps = timeRangeArr.map((date) => date.valueOf());
    dispatch(updateDashDisplayTimeRangeActionCreator(timeRangeArrAsTimestamps));
    setDashDisplayAlertsTimeRange(timeRangeArr.map(dayjs));
    console.log("timeRangeArr", timeRangeArr);
  };

  return (
    <div>
      <Box m="30px">
        <SubHeader
          title="Dashboard"
          // subtitle="Hi, welcome to your dashboard  ʕ ⊃･ ◡ ･ ʔ⊃ ━☆ﾟ.*･｡*☆"
        />
        <Box sx={{ display: "flex", flexDirection: "column", minWidth: 120 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              minWidth: 120,
            }}
          >
            <FormControl sx={{ minWidth: 200 }}>
              <DatePicker
                label="Start date"
                defaultValue={dashDisplayAlertsTimeRange[0]}
                value={dashDisplayAlertsTimeRange[0]}
                onChange={(newValue) =>
                  handleDashDisplayAlertsTimeRange([
                    newValue,
                    dashDisplayAlertsTimeRange[1],
                  ])
                }
                sx={{
                  backgroundColor: "#2E2D3D",
                  borderRadius: "5px",
                }}
              />
              <FormHelperText>
                Pick start date for lookback range
              </FormHelperText>
            </FormControl>
            <Box
              sx={{ display: "flex", justifyContent: "center", mx: 0.5, mb: 2 }}
            >
              <Divider
                orientation="horizontal"
                sx={{ bgcolor: "white", height: ".5px", width: "10px" }}
                variant="middle"
                flexItem
              />
            </Box>
            <FormControl sx={{ minWidth: 200 }}>
              <DatePicker
                label="End date"
                value={dashDisplayAlertsTimeRange[1]}
                onChange={(newValue) =>
                  handleDashDisplayAlertsTimeRange([
                    dashDisplayAlertsTimeRange[0],
                    newValue,
                  ])
                }
                sx={{
                  backgroundColor: "#2E2D3D",
                  borderRadius: "5px",
                }}
              />
              <FormHelperText>Pick end date for lookback range</FormHelperText>
            </FormControl>
            <Box
              sx={{
                display: "flex",
                flexDirection: ["column", "row"],
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 120,
                ml: 3,
                mb: 2,
              }}
            >
              <Chip
                label="Reset to past 7 days"
                onClick={() =>
                  handleDashDisplayAlertsTimeRange([
                    dayjs().subtract(7, "day"),
                    dayjs(),
                  ])
                }
                sx={{ mr: 1, p: 0.5 }}
              />
              <Chip
                label="Past 30 days"
                onClick={() =>
                  handleDashDisplayAlertsTimeRange([
                    dayjs().subtract(30, "day"),
                    dayjs(),
                  ])
                }
                sx={{ mr: 1, p: 0.5 }}
              />
              <Chip
                label="Past 60 days"
                onClick={() =>
                  handleDashDisplayAlertsTimeRange([
                    dayjs().subtract(60, "day"),
                    dayjs(),
                  ])
                }
                sx={{ mr: 1, p: 0.5 }}
              />
              <Chip
                label="Past 90 days"
                onClick={() =>
                  handleDashDisplayAlertsTimeRange([
                    dayjs().subtract(90, "day"),
                    dayjs(),
                  ])
                }
                sx={{ mr: 1, p: 0.5 }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default DashboardHeader;
