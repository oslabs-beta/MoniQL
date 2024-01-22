import React from 'react';
import LoginContainer from './components/LoginContainer';
import AppContainer from './containers/AppContainer';
import "./components/stylesheets/App.css";
import { useSelector } from 'react-redux';

const App = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);


  return (
    <div className='App'>
      {/* { (isLoggedIn) ? <AppContainer /> : <LoginContainer /> } */}
      <AppContainer />
    </div>
  );
};

export default App;

