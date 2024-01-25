import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import { Drawer, AppBar, Box, Toolbar, IconButton, InputBase, Badge, 
  MenuItem, Menu, createTheme, ThemeProvider, Divider, useTheme } from '@mui/material';
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";
import AlertBox from "./AlertBox";

//theme dark/light mode
import { tokens } from "./stylesheets/Themes";

const theme = createTheme({
    //  typography: {
    //    fontFamily: "Roboto",
    //  },
  palette: {
    primary: {
      main: "#222130",
      light: "#2A2A43",
      dark: "#2E2D3D",
    },
    secondary: {
      main: "#7275F1",
    },
  },
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.07),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Header = () => {
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const alertsArr = useSelector((state) => state.alert.alerts);
  React.useEffect(() => {
    setAlertsCount(
      alertsArr.filter((alertObj) => alertObj.display).length
      );
  }, [alertsArr]);

  const [alertsCount, setAlertsCount] = React.useState(alertsArr.length);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Sign out</MenuItem>
    </Menu>
  );

  const [alertsDrawerToggle, setAlertsDrawerToggle] = React.useState(false);

  const handleAlertsDrawerToggle = () => {
    setAlertsDrawerToggle(!alertsDrawerToggle);
  }

  let anomalies = alertsArr.sort((a, b) => b.anomalyTime - a.anomalyTime);
  anomalies = anomalies.map((alertObj, i) => <AlertBox key={i * 2} {...alertObj}/>);

  const renderAlertsDrawer = (
    <Drawer anchor='right' open={alertsDrawerToggle}>
      <Box sx={{width: 350}}>
      <IconButton
                size="large"
                aria-label={`show ${alertsCount} new alerts`}
                color="inherit"
                onClick={handleAlertsDrawerToggle}
              >
                <Badge badgeContent={alertsCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
        {anomalies}
      </Box>
    </Drawer>
  )

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{ boxShadow: 0 }}
          // sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, boxShadow: 0 }}
        >
          <Toolbar sx={{ ml: 15 }}>
            {/* <Typography
              variant="h6"
              noWrap
              color={theme.palette.secondary.light}
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              H.A.C.K.
            </Typography> */}
            {/* <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search> */}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label={`show ${alertsCount} new alerts`}
                color="inherit"
                onClick={handleAlertsDrawerToggle}
              >
                <Badge badgeContent={alertsCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>

          {/* DELETE THIS */}
          <Divider color="#444756" />
        </AppBar>
        {renderAlertsDrawer}
        {renderMenu}
      </Box>
    </ThemeProvider>
  );
};

export default Header;
