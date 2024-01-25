import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  AppBar,
  createTheme,
  CssBaseline,
  ThemeProvider,
  ListItemIcon,
  useTheme,
  IconButton,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { selectPageActionCreator } from "../actions/actions";
//icons
//dashboard 
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";

//ERD
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
//monitor Outlined
import InsightsIcon from "@mui/icons-material/Insights";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
//reports
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import AssessmentIcon from "@mui/icons-material/Assessment";
//query
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
//light/dark mode
import LightModeIcon from "@mui/icons-material/LightMode";
//settings
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
//logo
import GradeIcon from "@mui/icons-material/Grade";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CastleIcon from "@mui/icons-material/Castle";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";

//////////////////////hay added for light/dark mode/////////////////////
import tokens from "./stylesheets/Themes";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

//////////////////////END light/dark mode/////////////////////

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#2F3243",
//       light: "#E5E7FA",
//       dark: "#1565c0",
//     },
//     secondary: {
//       main: "#E5E7FA",
//     },
//   },
// });

const listItems = [
  {
    listIcon: <HomeOutlinedIcon sx={{ fontSize: 25 }} />,
    listText: "Dashboard",
  },
  {
    listIcon: <AccountTreeOutlinedIcon sx={{ fontSize: 25 }} />,
    listText: "ERD",
  },
  {
    listIcon: <AutoGraphOutlinedIcon sx={{ fontSize: 25 }} />,
    listText: "Monitors",
  },
  {
    listIcon: <AssessmentOutlinedIcon sx={{ fontSize: 25 }} />,
    listText: "Reports",
  },
  {
    listIcon: <QueryStatsOutlinedIcon sx={{ fontSize: 25 }} />,
    listText: "Query",
  },
];

const hackLogo = {
  listIcon: <CastleIcon sx={{ fontSize: 35 }} />,
  listText: "Query",
};

const drawerWidth = 120;

const SideBar = () => {
  //////////////////////hay added for light/dark mode/////////////////////
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleClick = (item) => {
    setSelectedItem(item);
    dispatch(selectPageActionCreator(item.listText));
  };
  //////////////////////hay added for light/dark mode/////////////////////

  const dispatch = useDispatch();

  return (
    <div>
      {/* <Box sx={{ display: "flex" }}> */}
        <Drawer
          variant="permanent"
          about="left"
          //BOX SHADOW
          sx={{
            flexShrink: 0,
            width: drawerWidth,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#2A2A43",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AutoAwesomeIcon sx={{ mt: 3, color: "#4cceac" }} />

            <Typography
              align="center"
              variant="h6"
              noWrap
              color="#a4a9fc"
              component="div"
              // transform: { rotate: '90deg'}
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              hide_n_go_SQL
            </Typography>
          </Box>
          <Toolbar />
          <Box display="flex" flexDirection="column" height="100%">
            <Box>
              <List>
                {listItems.map((item, index) => (
                  <ListItem
                    className="listItem"
                    key={index}
                    // disablePadding
                    sx={{ display: "block", mb: 1, mt: 1 }}
                  >
                    <ListItemButton
                      sx={{
                        justifyContent: "center",
                        "&:hover": {
                          backgroundColor: "#868dfb",
                        },
                      }}
                      onClick={() => handleClick(item)}
                    >
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <ListItemIcon
                          className="listItem"
                          style={{
                            color: item === selectedItem ? "#6870fa" : "white",
                          }}
                          sx={{
                            size: "small",
                            justifyContent: "center",
                            mb: 1,
                          }}
                        >
                          {item.listIcon}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              align="center"
                              fontSize="14px"
                              color={
                                item === selectedItem ? "#6870fa" : "white"
                              }
                            >
                              {item.listText}
                            </Typography>
                          }
                        />
                      </Box>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box mt="auto" align="center" sx={{ mb: 5 }}>
              <IconButton
                label="Settings"
                sx={{
                  justifyContent: "center",
                  "&:hover": {
                    backgroundColor: "#868dfb",
                  },
                }}
              >
                <SettingsIcon sx={{ fontSize: 25 }} />
              </IconButton>
            </Box>
          </Box>
        </Drawer>
      {/* </Box> */}
    </div>
  );
};

export default SideBar;
