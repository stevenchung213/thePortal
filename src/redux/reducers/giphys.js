import {
  GIPHYS_HAS_ERRORED,
  GIPHYS_ARE_LOADING,
  GIPHYS_GET_SUCCESS,
  GIPHY_HAS_ERRORED,
  GIPHY_IS_LOADING,
  GIPHY_SEARCH_SUCCESS
} from "../constants/action-types";

//Giphy Reducers

export const giphysHasErrored = (state = false, action) => {
  if (action.type === GIPHYS_HAS_ERRORED) {
    return action.hasErrored;
  }
  return state;
};

export const giphysAreLoading = (state = false, action) => {
  if (action.type === GIPHYS_ARE_LOADING) {
    return action.isLoading;
  }
  return state;
};

export const giphysGetSuccess = (state = [], action) => {
  if (action.type === GIPHYS_GET_SUCCESS) {
    return action.giphys;
  }
  return state;
};

// GiphySearch Reducers

export const giphyHasErrored = (state = false, action) => {
  if (action.type === GIPHY_HAS_ERRORED) {
    return action.hasErrored;
  }
  return state;
};

export const giphyIsLoading = (state = false, action) => {
  if (action.type === GIPHY_IS_LOADING) {
    return action.isLoading;
  }
  return state;
};

export const giphySearchSuccess = (state = [], action) => {
  if (action.type === GIPHY_SEARCH_SUCCESS) {
    return action.randomGiphy;
  }
  return state;
};
