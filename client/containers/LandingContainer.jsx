import * as React from "react";
import {
  Box,
  Toolbar,
  Button,
  ThemeProvider,
  useTheme,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { ColorModeContext, tokens } from "../components/stylesheets/Themes.jsx";
import { useContext, useState } from "react";
import LoginContainer from "../components/LoginContainer";

const LandingContainer = () => {
  const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  // const colorMode = useContext(ColorModeContext);

  const [showLogin, setShowLogin] = useState(false);

  return (
    <div style={{ 
    backgroundImage: `url(https://i.pinimg.com/originals/60/15/9f/60159f45955be086e295dd9400ceee86.jpg)`, 
    backgroundRepeat: 'no-repeat', 
    backgroundSize: 'cover',
    height: "100vh",
  }}>
      <Toolbar sx={{ ml: 15 }}>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="contained"
          size="large"
          edge="end"
          aria-haspopup="true"
          color="primary"
          onClick={() => setShowLogin(true)}
        >
          Log in / Sign up
        </Button>
      </Toolbar>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        {showLogin && <LoginContainer closeLogin={() => setShowLogin(false)} />}
      </div>
    </div>
  );
};

export default LandingContainer;
