import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers";

const makeStore = initialState => {
  const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
  
  if (module.hot) {
    module.hot.accept('../reducers/index.js', () => {
      store.replaceReducer(rootReducer);
    });
  }
  return store;
};

export default makeStore;
