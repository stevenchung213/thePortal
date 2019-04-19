import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from './Home';
import Signup from './Signup';
import Login from "./Login";
import NoMatch from './404';
import Callback from '../auth0/Callback';

const mainContainer = {
  fontFamily: 'Roboto, serif',
  display: 'flex',
  height: '100vh',
  width: '100vw'
};

const Main = ({ auth, history }) => {
  // console.log('***MAIN.auth***\n', auth)
  // console.log('***MAIN.history***\n', history)
  const authenticated = auth.isAuthenticated();

  return (
    <div className='main-container' style={mainContainer}>
      <Switch>
        <Route exact path="/" render={() => (
          <Home auth={auth}
                authenticated={authenticated}
                history={history}/>
                )}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/login" render={() => (
          <Login auth={auth}/>
          )}/>
        <Route path='/callback' render={() => (
          <Callback auth={auth} history={history}/>
          )}/>
        <Route component={NoMatch}/>
      </Switch>
    </div>
  );
};

export default hot(withRouter(Main));
