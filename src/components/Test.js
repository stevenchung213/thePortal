import React, { Component } from 'react';
import {
  Route,
  Link,
  Redirect,
  BrowserRouter as Router,
  withRouter
} from 'react-router-dom';
import Switch from "react-router-dom/es/Switch";


const routes = [
  {
    path: '/sidebar1',
    exact: true,
    leftbar: () => <div>SideBarTest1</div>,
    main: () => <h2>SideBarTest1 Content</h2>
  },
  {
    path: '/sidebar2',
    leftbar: () => <div>SideBarTest2</div>,
    main: () => <h2>SideBarTest2 Content</h2>
  }
];

const Home = () => (
  <div>
    <h2> Home </h2>
  </div>
);

const Contact = () => (
  <div>
    <h2>Contact Page</h2>
  </div>
);

const Public = () => (
  <div> This is a public page </div>
);

const Private = () => (
  <div> This is a private page </div>
);


const AuthService = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    console.log('*****AuthService.authenticate called******')
    setTimeout(cb, 100)
  },
  logout(cb) {
    console.log('*****AuthService.logout called******')
    this.isAuthenticated = false;
    setTimeout(cb, 100)
  }
};


const SecretRoute = ({ component: Component, ...rest }) => {
  console.log('*****SECRET ROUTE COMPONENT******\n', Component, '\n', '*****SECRET ROUTE rest******\n', rest)
  return (
    <Route {...rest} render={(props) => (
      AuthService.isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
    )}/>
  );
};

const AuthStatus = withRouter(({ history }) => {
  return (
    AuthService.isAuthenticated ? (
      <p>
        Welcome!
        <button onClick={() => {
          AuthService.logout(() => history.push('/'))
        }}>Sign out</button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
  )
});

const CustomLink = ({ children, to, exact }) => {
  console.log('****children*****\n', children, '\n****to*****\n', to, '\n****exact*****\n', exact)
  return (
    <Route path={to} exact={exact} children={({ match }) => {
      return (
        <div className={match ? 'active' : ''}>
          {match ? '> ' : ''}
          {console.log('****match*****\n', match)}
          <Link to={to}>
            {children}
          </Link>
        </div>
      )
    }}/>
  )
};

class Login extends React.Component {
  state = {
    redirectToPreviousRoute: false
  };

  login = () => {
    AuthService.authenticate(() => {
      this.setState({ redirectToPreviousRoute: true });
    });
  };

  render() {
    console.log('****this.props.location*****\n', this.props.location)
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToPreviousRoute } = this.state;
    console.log('****this.props.location.state.from*****\n', from, '\n****this.state.redirectToPreviousRoute*****\n', redirectToPreviousRoute)

    if (redirectToPreviousRoute) {
      return <Redirect to={from}/>;
    }

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}


class App extends Component {
  render() {
    return (
      <Router>
        <div style={{ width: 1000, margin: '0 auto' }}>
          <div style={{
            padding: '10px',
            width: '40%',
            background: 'black'
          }}>
            <AuthStatus/>
            <ul>
              <li><Link to='/public'> Public </Link></li>
              <li><Link to='/private'> Private </Link></li>
            </ul>
            <Route path='/public' component={Public}/>
            <Route path='/login' component={Login}/>
            <SecretRoute path='/private' component={Private}/>
          </div>

          <hr/>

          <CustomLink exact={true} to="/">Home</CustomLink>
          <CustomLink to="/contact">Contact</CustomLink>

          <br/>

          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/contact" component={Contact}/>
            <Route render={() => (<div> Sorry, this page does not exist. </div>)}/>
          </Switch>
          <hr/>

          <div style={{ display: 'flex' }}>
            <div style={{
              padding: '10px',
              width: '40%',
              background: 'yellow'
            }}>
              <ul style={{ listStyleType: 'none' }}>
                <li><Link to="/sidebar1">SideBar1</Link></li>
                <li><Link to="/sidebar2">SideBar2</Link></li>
              </ul>
              {
                routes.map(route => {
                  return (
                    <Route key={route.path}
                           path={route.path}
                           exact={route.exact}
                           component={route.leftbar}/>
                  )
                })
              }
            </div>
            <div style={{ display: 'flex', padding: 20 }}>
              {
                routes.map(route => (
                  <Route key={route.path}
                         path={route.path}
                         exact={route.exact}
                         component={route.main}/>
                ))
              }
            </div>

          </div>
          <hr/>

        </div>
      </Router>
    );
  }
}

export default App;
