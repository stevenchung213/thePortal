import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Switch } from 'react-router-dom';
import Home from '../views/Home/Home';
import Signup from '../views/Signup/Signup';
import Login from "../views/Login/Login";
import NoMatch from '../views/NoMatch/404';
import App from './Test';

const mainContainer = {
  fontFamily: 'Roboto, serif',
  display: 'flex',
  height: '100vh',
  width: '100vw'
};

const Main = () => {
  return (
    <div className='main-container' style={mainContainer}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/login" component={Login}/>
        <Route component={NoMatch}/>
      </Switch>
    </div>
  );
};

export default hot(Main);
