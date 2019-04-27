import {
  GIPHYS_HAS_ERRORED,
  GIPHYS_ARE_LOADING,
  GIPHYS_GET_SUCCESS,
  GIPHY_HAS_ERRORED,
  GIPHY_IS_LOADING,
  GIPHY_SEARCH_SUCCESS
} from "../constants/action-types";

// Giphy Actions

export const giphysHasErrored = bool => {
  return {
    type: GIPHYS_HAS_ERRORED,
    hasErrored: bool
  }
};

export const giphysAreLoading = bool => {
  return {
    type: GIPHYS_ARE_LOADING,
    isLoading: bool
  }
};

export const giphysGetSuccess = giphys => {
  return {
    type: GIPHYS_GET_SUCCESS,
    giphys
  }
};

export const giphysGetCollection = endpoint => {
  return dispatch => {
    dispatch(giphysAreLoading(true));
    
    fetch(endpoint)
      .then(resp => {
        if (!resp.ok) {
          console.log('ERROR during giphysGetCollection!')
          throw Error(resp.statusText);
        }
        dispatch(giphysAreLoading(false));
        return resp;
      })
      .then(resp => resp.json())
      .then(giphys => {
        console.log('giphysGetSuccess\n', giphys)
        dispatch(giphysGetSuccess(giphys));
      })
      .catch(() => dispatch(giphysHasErrored(true)));
  }
};

// GiphySearch Actions

export const giphyHasErrored = bool => {
  return {
    type: GIPHY_HAS_ERRORED,
    hasErrored: bool
  }
};

export const giphyIsLoading = bool => {
  return {
    type: GIPHY_IS_LOADING,
    isLoading: bool
  }
};

export const giphySearchSuccess = randomGiphy => {
  return {
    type: GIPHY_SEARCH_SUCCESS,
    randomGiphy
  }
};

export const giphySearch = (form, endpoint) => {
  const formData = new FormData(form.target);
  const query = {};

  for (let entry of formData.entries()) {
    query[entry[0]] = entry[1];
  }

  return dispatch => {
    dispatch(giphyIsLoading(true));
    console.log('giphySearch in dispatch\n', query)
    fetch(endpoint,
      {
        method: 'POST',
        body: JSON.stringify(query),
        headers: {
          "Content-type": "application/json"
        }
      })
      .then(resp => {
        if (!resp.ok) {
          console.log('ERROR during giphySearch!')
          throw Error(resp.statusText);
        }
        dispatch(giphyIsLoading(false));
        return resp;
      })
      .then(resp => resp.json())
      .then(randomGiphy => {
        const giphy = randomGiphy.data;
        console.log('giphySearch\n', giphy)
        dispatch(giphySearchSuccess(giphy));
      })
      .catch(() => dispatch(giphyHasErrored(true)));
  }
};