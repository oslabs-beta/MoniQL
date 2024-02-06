import * as React from 'react';
import { useDispatch } from 'react-redux';
import { logOutActionCreator } from '../actions/actions';
import { styled, alpha } from '@mui/material/styles';
import {
  Drawer,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  createTheme,
  ThemeProvider,
  Divider,
  useTheme,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';
import AlertBox from './AlertBox';
//////////////////////hay added for light/dark mode/////////////////////
import { ColorModeContext, tokens } from './stylesheets/Themes';
import { useContext } from 'react';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
//////////////////////hay added for light/dark mode/////////////////////

// const theme = createTheme({
//   //  typography: {
//   //    fontFamily: "Roboto",
//   //  },
//   palette: {
//     primary: {
//       main: "#222130",
//       light: "#2A2A43",
//       dark: "#2E2D3D",
//     },
//     secondary: {
//       main: "#7275F1",
//     },
//   },
// });

const Header = () => {
  const dispatch = useDispatch();
  //////////////////////hay added for light/dark mode/////////////////////
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  //////////////////////hay added for light/dark mode/////////////////////

  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    dispatch(logOutActionCreator())
  };

  const displayAlerts = useSelector((state) => state.alert.displayAlerts);
  React.useEffect(() => {
    setAlertsCount(displayAlerts.length);
  }, [displayAlerts]);

  const [alertsCount, setAlertsCount] = React.useState(0);

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
    </Menu>
  );

  const [alertsDrawerToggle, setAlertsDrawerToggle] = React.useState(false);

  const handleAlertsDrawerToggle = () => {
    setAlertsDrawerToggle(!alertsDrawerToggle);
  };

  let anomalies = displayAlerts.sort((a, b) => new Date(b.detected_at) - new Date(a.detected_at));
  anomalies = anomalies.map((alertObj, i) => (
    <AlertBox key={i} {...alertObj} />
  ));

  const renderAlertsDrawer = (
    <Drawer
      anchor='right'
      open={alertsDrawerToggle}
      onClose={handleAlertsDrawerToggle}
      sx={{
        '& .MuiDrawer-paper': {
          width: 350,
          boxSizing: 'border-box',
          backgroundColor: 'black'
        },
      }}
    >
      <Box sx={{ width: 350 }}>
        <IconButton
          size='large'
          aria-label={`show ${alertsCount} new alerts`}
          color='inherit'
          onClick={handleAlertsDrawerToggle}
        >
          <Badge badgeContent={alertsCount} color='error'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        {anomalies}
      </Box>
    </Drawer>
  );

  return (
    // <ThemeProvider theme={theme}>
    <Box>
      <Toolbar sx={{ ml: 15 }}>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton
          size='large'
          aria-label={`show ${alertsCount} new alerts`}
          color='inherit'
          onClick={handleAlertsDrawerToggle}
        >
          <Badge badgeContent={alertsCount} color='error'>
            <NotificationsOutlinedIcon />
          </Badge>
        </IconButton>
        <IconButton
          size='large'
          edge='end'
          aria-label='account of current user'
          aria-controls={menuId}
          aria-haspopup='true'
          onClick={handleProfileMenuOpen}
          color='inherit'
        >
          <PersonOutlinedIcon />
        </IconButton>
      </Toolbar>
      {renderAlertsDrawer}
      {renderMenu}
    </Box>
  //  </ThemeProvider>
  );
};

export default Header;
