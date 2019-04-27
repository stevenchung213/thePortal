import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import rootReducer from "../reducers";

const makeStore = initialState => {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
  
  if (module.hot) {
    module.hot.accept('../reducers/index.js', () => {
      store.replaceReducer(rootReducer);
    });
  }
  return store;
};

export default makeStore;
