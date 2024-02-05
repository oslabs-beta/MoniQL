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
    <div>
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
