import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { createTheme, ThemeProvider } from "@mui/material";

// import { Themes } from "./stylesheets/Themes";
// const useStyles = makeStyles((theme) => ({
// menuSliderContainer: {
//     width: 250,
//     background: "#2F3243",
//     height: "100%"
//   },
//   listItem: {
//     color: "tan"
//   }
// }));
// });

const theme = createTheme({
  //    typography: {
  //      fontFamily: "Roboto",
  //    },
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

// const listItems = [
//   {
//     listIcon: <Home />,
//     listText: "Visualize",
//   },
//   {
//     listIcon: <AssignmentInd />,
//     listText: "Monitors",
//   },
//   {
//     listIcon: <Apps />,
//     listText: "Reports",
//   },
//   {
//     listIcon: <ContactMail />,
//     listText: "Query",
//   },
// ];

const drawerWidth = 150;

const SideBar = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#2F3243",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <Typography color="#B5B8CB">
              {["Visualize", "Monitors", "Reports", "Query"].map(
                (text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                )
              )}
            </Typography>
          </List>
          <Divider color="#444756" />
          <List>
            <Typography color="#B5B8CB">
              {["Account", "Settings", "Help"].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </Typography>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

export default SideBar;