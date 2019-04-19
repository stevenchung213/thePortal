import React from 'react';
import { withRouter, Route } from 'react-router-dom';
import Callback from '../auth0/Callback';


const HomePage = props => {
  console.log('***AUTH.HOMEPAGE***\n', props)
  const { authenticated } = props;

  const logout = () => {
    props.auth.logout();
    props.history.push('/');
  };

  if (authenticated) {
    const { name } = props.auth.getProfile();
    return (
      <div>
        <h1>Howdy! Glad to see you back, {name}.</h1>
        <button onClick={logout}>Log out</button>
      </div>
    );
  }

  return (
    <div>
      <h1>I don't know you. Please, log in.</h1>
      <button onClick={props.auth.login}>Log in</button>
    </div>
  );
};

const App = props => {
  console.log('***AUTH.APP***\n', props)
  const authenticated = props.auth.isAuthenticated();

  return (
    <div className="App">
      <Route exact path='/callback' render={() => (
        <Callback auth={props.auth}/>
      )}/>
      <Route exact path='/' render={() => (
        <HomePage
          authenticated={authenticated}
          auth={props.auth}
          history={props.history}
        />)
      }/>
    </div>
  );
};

export default withRouter(App);