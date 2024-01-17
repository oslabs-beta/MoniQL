import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logInActionCreator } from '../actions/actions';
//mui imports below:
import { Roboto, Container, Switch, Link, Box, TextField, Typography, Button } from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles";
// import { CssBaseline } from '@material-ui/core';


const theme = createTheme({
  typography: {
    fontFamily: ["Pixelify Sans", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#766ffc",
    },
    secondary: {
      main: "#9c97fc",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          padding: 15,
        },
      },
    },
  },
})




const LoginContainer = () => {
  const [regToggle, setRegToggle] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [uri, setUri] = useState('');
  
  const dispatch = useDispatch();

  const handleAuth = async (path) => {
    try {
      console.log(`**************** this is your path: ${path} ****************`)
      const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, password})
      };
      const response = await fetch(path, requestOptions);
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || 'Error from server')
      console.log(`here is your userID: ${data.userId}`)
      dispatch(logInActionCreator(data.userId, data.uri));


      //leaving this open for now, but here is where we will go store shit in redux state

    } catch (err) {
      console.error(err.message);
    }
  }


  return (
  <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant='h5'>Sign In</Typography>
        <Box 
          // component="form" 
          onSubmit={() =>
          regToggle ? handleAuth("/register") : handleAuth("/login")
        } 
        noValidate sx={{ mt: 1 }}>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => setRegToggle(!regToggle)}>
        {regToggle ? "Register" : "Log In"}
          </Button>
            <TextField
              margin="normal"
              required
              label="username"
              fullWidth
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
             <TextField
              margin="normal"
              required
              fullWidth
              id="uri"
              value={uri}
              onChange={(e) => setUri(e.target.value)}
            />
            <Button
            onClick={() =>
              regToggle ? handleAuth("/register") : handleAuth("/login")
            } 
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {regToggle ? "Register" : "Sign in"}
          </Button>
          </Box>
        </Box>
    </Container>
  </ThemeProvider>
  );
};


export default LoginContainer;


    {/* <div>
      <h1>Log In</h1>
      <button onClick={() => setRegToggle(!regToggle)}>
        {regToggle ? "Register" : "Log In"}
      </button>
      <form
        onSubmit={() =>
          regToggle ? handleAuth("/register") : handleAuth("/login")
        }
      >
        <div>
          <label htmlFor="username">username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password:</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <label htmlFor="uri">SQL URI:</label>
        <input
          type="text"
          id="uri"
          value={uri}
          onChange={(e) => setUri(e.target.value)}
        />
        <div>
          <button type="submit">{regToggle ? "Register" : "Sign in"}</button>
        </div>
      </form>
    </div> */}