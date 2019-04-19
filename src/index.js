import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { AppContainer } from 'react-hot-loader';
import Main from './components/Main';
import styles from './styles.css';
import store from './redux/store/index';
import Auth from './auth0/Auth';

const auth = new Auth();

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <Component auth={auth}/>
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(Main);

// webpack Hot Module Replacement API
if (module.hot) {
  // keep in mind - here you are configuring HMR to accept CHILDREN MODULE
  // while `hot` would configure HMR for the CURRENT module
  module.hot.accept('./components/Main.js', () => {
    // if you are using harmony modules ({modules:false})
    const NextMain = require('./components/Main').default;
    // in all other cases - re-require App manually
    render(NextMain);
  });
  // clear console on reload
  module.hot.addStatusHandler(status => {
    if (status === 'prepare') console.clear()
  })
}
