import * as React from "react";
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
import { AppBar, createTheme, CssBaseline, ThemeProvider, ListItemIcon } from "@mui/material";
import { useDispatch } from "react-redux";
import { selectPageActionCreator } from '../actions/actions'
//icons
//dashboard
import HomeIcon from "@mui/icons-material/Home";
//ERD
import AccountTreeIcon from "@mui/icons-material/AccountTree";
//monitor
import InsightsIcon from "@mui/icons-material/Insights";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
//reports
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import AssessmentIcon from "@mui/icons-material/Assessment";
//query
import QueryStatsIcon from "@mui/icons-material/QueryStats";
//bubbles
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
//light/dark mode
import LightModeIcon from "@mui/icons-material/LightMode";
//logo
import GradeIcon from "@mui/icons-material/Grade";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CastleIcon from "@mui/icons-material/Castle";



const theme = createTheme({
  palette: {
    primary: {
      main: "#2F3243",
      light: "#E5E7FA",
      dark: "#1565c0",
    },
    secondary: {
      main: "#E5E7FA",
    },
  },
});
// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },

const listItems = [
  {
    listIcon: <HomeIcon sx={{ fontSize: 35 }} />,
    listText: "Dashboard",
  },
  {
    listIcon: <AccountTreeIcon sx={{ fontSize: 35 }} />,
    listText: "ERD",
  },
  {
    listIcon: <AutoGraphIcon sx={{ fontSize: 35 }} />,
    listText: "Monitors",
  },
  {
    listIcon: <AssessmentIcon sx={{ fontSize: 35 }} />,
    listText: "Reports",
  },
  {
    listIcon: <QueryStatsIcon sx={{ fontSize: 35 }} />,
    listText: "Query",
  },
];

const hackLogo = {
  listIcon: <CastleIcon sx={{ fontSize: 35 }} />,
  listText: "Query",
};

const drawerWidth = 130;


const SideBar = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <Box sx={{ display: "flex", border: "1px solid #000" }}>
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
          <Typography
            align="center"
            variant="h6"
            noWrap
            color={theme.palette.secondary.light}
            component="div"
            // transform: { rotate: '90deg'}
            sx={{ mt: 3, display: { xs: "none", sm: "block" } }}
          >
            hide_n_go_SQL
            {/* {hackLogo} */}
          </Typography>
          <Toolbar />
          {/* do we want this? */}
          {/* <Divider color="#444756" /> */}
          <Box display="flex" flexDirection="column" height="100%">
            <Box>
              <List>
                {listItems.map((listItems, index) => (
                  <ListItem
                    key={index}
                    disablePadding
                    sx={{ display: "block", mb: 3, mt: 3 }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 68,
                        justifyContent: "center",
                        px: 2.5,
                      }}
                      onClick={() =>
                        dispatch(selectPageActionCreator(listItems.listText))
                      }
                    >
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <ListItemIcon
                          sx={{
                            size: "large",
                            color: "white",
                            justifyContent: "center",
                            mb: 1,
                          }}
                        >
                          {listItems.listIcon}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography align="center" color="#B5B8CB">
                              {listItems.listText}
                            </Typography>
                          }
                        />
                      </Box>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box mt="auto">
              <Divider color="#444756" />
              <List>
                {["Account", "Settings", "Help"].map((text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton>
                      <ListItemText
                        primary={
                          <Typography align="center" color="#B5B8CB">
                            {text}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Drawer>
      </Box>
    </div>
  );
};

export default SideBar;


