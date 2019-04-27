import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from './Home';
import Signup from './Signup';
import Login from "./Login";
import NoMatch from './404';
import Callback from '../auth0/Callback';
import PrivateRoute from './PrivateRoute';
import Giphy from "./Giphy/Giphy";
import Dashboard from "./Dashboard";
import Navigation from "./Navbar";
import GiphySearch from "./Giphy/GiphySearch";

const mainContainer = {
  fontFamily: 'Roboto, serif',
  display: 'flex',
  height: '100vh',
  width: '100vw'
};

class Main extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      signup: false,
      login: false
    }
  }
  
  handleButton = (e) => {
    const name = e.target.name;
    this.setState({
      [name]: !this.state[name]
    })
  };
  
  render() {
    const authenticated = this.props.auth.isAuthenticated();
    const { auth, history } = this.props;
    const user = authenticated ? auth.profile.nickname : '';
    
    return (
      <div className='main-container' style={mainContainer}>
        {authenticated && <Navigation auth={auth}/>}
        <Switch>
          <Route exact path="/" render={() => (
            authenticated ?
              <Dashboard auth={auth} history={history}/>
              :
              <Home auth={auth}
                    handleButton={this.handleButton}
                    view={this.state}/>
          )}/>
          <Route path="/signup" render={() => <Signup/>}/>
          <Route path="/login" render={() => <Login auth={auth}/>}/>
          <Route path='/callback' render={() => (
            <Callback auth={auth} history={history}/>
          )}/>
          <PrivateRoute exact path='/giphy' authenticated={authenticated}
                        user={user} component={Giphy}/>
          <PrivateRoute path='/giphy/search' authenticated={authenticated}
                        user={user} component={GiphySearch}/>
          <Route component={NoMatch}/>
        </Switch>
      </div>
    );
  }
}

export default hot(withRouter(Main));
