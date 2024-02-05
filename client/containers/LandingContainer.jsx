import * as React from "react";
import { Drawer, AppBar, Box, Toolbar, IconButton, InputBase, Badge, 
  MenuItem, Menu, createTheme, ThemeProvider, Divider, useTheme, Typography } from '@mui/material';
import { useSelector } from "react-redux";
import { ColorModeContext, tokens } from "./stylesheets/Themes";
import { useContext } from "react";
import LoginContainer from "../components/LoginContainer";

const LandingContainer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);



  return (
    <div>

        <LoginContainer />
    </div>
  );
};

export default LandingContainer;




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


// const Header = () => {
//   //////////////////////hay added for light/dark mode/////////////////////

//   //////////////////////hay added for light/dark mode/////////////////////

//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const isMenuOpen = Boolean(anchorEl);

//   const handleProfileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const alertsArr = useSelector((state) => state.alert.alerts);
//   React.useEffect(() => {
//     setAlertsCount(
//       alertsArr.filter((alertObj) => alertObj.display).length
//       );
//   }, [alertsArr]);

//   const [alertsCount, setAlertsCount] = React.useState(alertsArr.length);

//   const menuId = "primary-search-account-menu";
//   const renderMenu = (
//     <Menu
//       anchorEl={anchorEl}
//       anchorOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//       id={menuId}
//       keepMounted
//       transformOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//       open={isMenuOpen}
//       onClose={handleMenuClose}
//     >
//       <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
//       <MenuItem onClick={handleMenuClose}>My account</MenuItem>
//       <MenuItem onClick={handleMenuClose}>Sign out</MenuItem>
//     </Menu>
//   );

//   const [alertsDrawerToggle, setAlertsDrawerToggle] = React.useState(false);

//   const handleAlertsDrawerToggle = () => {
//     setAlertsDrawerToggle(!alertsDrawerToggle);
//   }

//   let anomalies = alertsArr.sort((a, b) => b.anomalyTime - a.anomalyTime);
//   anomalies = anomalies.map((alertObj, i) => <AlertBox key={i} {...alertObj}/>);

//   const renderAlertsDrawer = (
//     <Drawer anchor='right' open={alertsDrawerToggle} onClose={handleAlertsDrawerToggle}>
//       <Box sx={{width: 350}}>
//       <IconButton
//                 size="large"
//                 aria-label={`show ${alertsCount} new alerts`}
//                 color="inherit"
//                 onClick={handleAlertsDrawerToggle}
//               >
//                 <Badge badgeContent={alertsCount} color="error">
//                   <NotificationsIcon />
//                 </Badge>
//               </IconButton>
//         {anomalies}
//       </Box>
//     </Drawer>
//   )

//   return (
//     // <ThemeProvider theme={theme}>
//     <Box>
//       <Toolbar sx={{ ml: 15 }}>
//         <Box sx={{ flexGrow: 1 }} />
//         <IconButton onClick={colorMode.toggleColorMode}>
//           {theme.palette.mode === "dark" ? (
//             <DarkModeOutlinedIcon />
//           ) : (
//             <LightModeOutlinedIcon />
//           )}
//         </IconButton>
//         <IconButton
//           size="large"
//           aria-label={`show ${alertsCount} new alerts`}
//           color="inherit"
//           onClick={handleAlertsDrawerToggle}
//         >
//           <Badge badgeContent={alertsCount} color="error">
//             <NotificationsOutlinedIcon />
//           </Badge>
//         </IconButton>
//         <IconButton
//           size="large"
//           edge="end"
//           aria-label="account of current user"
//           aria-controls={menuId}
//           aria-haspopup="true"
//           onClick={handleProfileMenuOpen}
//           color="inherit"
//         >
//           <PersonOutlinedIcon />
//         </IconButton>
//       </Toolbar>
//       {renderAlertsDrawer}
//       {renderMenu}
//     </Box>
// //  </ThemeProvider>
//   );
// };

// export default Header;
