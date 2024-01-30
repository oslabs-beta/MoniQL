import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logInActionCreator, saveDBActionCreator } from '../actions/actions';
//mui imports below:
import { Roboto, Container, Switch, Link, Box, TextField, Typography, Button, Tab, Tabs } from '@mui/material';
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
      main: "#B5B8CB",
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
});




const LoginContainer = () => {
  const [regToggle, setRegToggle] = useState(false);
  const [selectedTab, setSelectedTab] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [uri, setUri] = useState('');
  const [error, setError] = useState(''); 

  const dispatch = useDispatch();

  const handleAuth = async (path) => {
    try {
      console.log(`**************** this is your path: ${path} ****************`)
      const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, password, uri })
      };
      const response = await fetch(path, requestOptions);
      const data = await response.json();
      console.log('data returned in handleAuth func in LoginContainer', data)
      if (!response.ok) throw new Error(data.error || 'Error from server')
      console.log(`userID: ${data.userId}, username: ${data.username}, uri: ${data.uri} `)
      console.log('dbArray in handleAuth func in LoginContainer: ', data.dbArray)
      dispatch(logInActionCreator(data.userId, data.username, data.uri));
      dispatch(saveDBActionCreator(data.dbArray));
      

      //leaving this open for now, but here is where we will go store shit in redux state
      if (!response.ok) {
        setError(data.error || 'Error from server');
        throw new Error(data.error || 'Error from server');
      }
      // dispatch(logInActionCreator(data.userId, data.uri));
    } catch (err) {
      console.error('IN CATCH ERROR HANDLER FOR HANDLEAUTH', err.message);
    }
  }
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "rgba( 255, 255, 255, 0.25 )",
            backdropFilter: "blur( 4px )",
            borderRadius: "10px",
            border: "1px solid rgba( 255, 255, 255, 0.18 )",
            boxShadow: "0px 0px 23px 8px rgba(227,214,255,0.08)",
          }}
          ///////take out!//////////
          // sx={{
          //   marginTop: 8,
          //   padding: 4,
          //   display: "flex",
          //   flexDirection: "column",
          //   alignItems: "center",
          //   backgroundColor: "#35353F",
          //   borderRadius: 4,
          //   boxShadow: 3,
          // }}
        >
          <Typography color="white" component="h1" variant="h5">
            Sign In
          </Typography>
          <Box
            // component="form"
            onSubmit={() =>
              regToggle ? handleAuth("/register") : handleAuth("/login")
            }
            noValidate
            sx={{ mt: 1 }}
          >
            {/* <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => setRegToggle(!regToggle)}
            >
              {regToggle ? "Register" : "Log In"}
            </Button> */}
            <Tabs value={selectedTab} onChange={handleChange} centered>
              <Tab value="login" label="Login" />
              <Tab value="register" label="Register" />
            </Tabs>
            <TextField
              margin="normal"
              required
              label="username"
              fullWidth
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              sx={{
                input: { color: "hotpink" },
                // backgroundColor: "#3B3B4B",
                backgroundColor: "#e0e0e0",
                borderRadius: "5px",
              }}
              InputLabelProps={{
                style: { color: "hotpink" },
              }}
              InputProps={{
                style: { color: "hotpink" },
              }}
            />
            <Typography color="error" variant="body2">
            {/* {error} username does not exist */}
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              label="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                input: { color: "hotpink" },
                // backgroundColor: "#3B3B4B",
                backgroundColor: "#e0e0e0",
                borderRadius: "5px",
              }}
              InputLabelProps={{
                style: { color: "hotpink" },
              }}
              InputProps={{
                style: { color: "hotpink" },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="SQL"
              id="uri"
              value={uri}
              onChange={(e) => setUri(e.target.value)}
              sx={{
                input: { color: "hotpink" },
                // backgroundColor: "#3B3B4B",
                backgroundColor: "#e0e0e0",
                borderRadius: "5px",
              }}
              InputLabelProps={{
                style: { color: "hotpink" },
              }}
              InputProps={{
                style: { color: "hotpink" },
              }}
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
              {/* {regToggle ? "Register" : "Sign in"} */}
              {selectedTab === 'login' ? "Log In" : "Sign Up"}
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