import api from '../api/adapter';

export const GET_BEERS = 'GET_BEERS';
export const GET_BEER = 'GET_BEER';
export const ADD_BEER = 'ADD_BEER';
export const PATCH_BEER = 'PATCH_BEER';
export const MAKE_BEERS_LIST = 'MAKE_BEERS_LIST';


export const getBeers = () => {
  return (dispatch) => {
    return api.getAllBeers()
      .then(json => dispatch({
        type: GET_BEERS,
        payload: json
      }));
  };
};

export const getBeer = (id) => {
  return (dispatch) => {
    return api.getBeer(id)
      .then(json => dispatch({
        type: GET_BEER,
        payload: json
      }));
  };
};

export const addBeer = (beer) => {
  return (dispatch) => {
    return api.postNewBeer(beer)
      .then(json => dispatch({
        type: ADD_BEER,
        payload: json
      }));
  };
};

export const patchBeer = (beer) => {
  return (dispatch) => {
    return api.patchBeer(beer)
      .then(json => dispatch({
        type: PATCH_BEER,
        payload: json
      }));
  };
};

export const makeBeersList = (beers) => {
  return (dispatch) => {
    dispatch({ type: MAKE_BEERS_LIST });
  };
};
