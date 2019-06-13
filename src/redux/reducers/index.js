import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {
  giphysHasErrored,
  giphysAreLoading,
  giphysGetSuccess,
  giphyHasErrored,
  giphyIsLoading,
  giphySearchSuccess
} from "../reducers/giphys";

export default combineReducers({
  giphysHasErrored,
  giphysAreLoading,
  giphysGetSuccess,
  giphyHasErrored,
  giphyIsLoading,
  giphySearchSuccess,
  form: formReducer
});
