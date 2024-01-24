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
import { createTheme, ThemeProvider } from "@mui/material";

import { useDispatch } from "react-redux";

import { selectPageActionCreator } from '../actions/actions'

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

const drawerWidth = 150;

const SideBar = () => {
  const dispatch = useDispatch();

  return (
    <Box sx={{ display: "flex", border: '1px solid #000'  }}>
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
            {["Visualize", "Monitors", "Reports", "Query"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => dispatch(selectPageActionCreator(text))}>
                  <ListItemText primary={<Typography color="#B5B8CB">{text}</Typography>} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider color="#444756" />
          <List>
            {["Account", "Settings", "Help"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={<Typography color="#B5B8CB">{text}</Typography>} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
      </Box> */}
    </Box>
  );
}

export default SideBar;