import { combineReducers } from 'redux';
import {
  GET_MATCH,
  GET_PRO_MATCHES,
  GET_PUBLIC_MATCHES
} from '../actions/type';

const match = (state = {}, action) => {
  switch (action.type) {
    case GET_MATCH:
      return {
        ...state,
        data: action.response.data
      };
    default:
      return state;
  }
};

const proMatches = (state = {}, action) => {
  switch (action.type) {
    case GET_PRO_MATCHES:
      return {
        ...state,
        data: action.response.data
      };
    default:
      return state;
  }
};

const publicMatches = (state = {}, action) => {
  switch (action.type) {
    case GET_PUBLIC_MATCHES:
      return {
        ...state,
        data: action.response.data
      };
    default:
      return state;
  }
};

export default combineReducers({
  match,
  proMatches,
  publicMatches
});
