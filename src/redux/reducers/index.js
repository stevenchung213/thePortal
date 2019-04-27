import { combineReducers } from 'redux';
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
  giphySearchSuccess
});
