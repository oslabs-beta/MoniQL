import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logInActionCreator } from '../actions/actions';


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
    <div>
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
    </div>
  );
};

export default LoginContainer;

