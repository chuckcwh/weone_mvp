import { combineReducers } from 'redux';
import { GET_PLAYER, GET_PLAYER_WL, GET_PLAYER_RANKING } from '../actions/type';

const profile = (state = {}, action) => {
  switch (action.type) {
    case GET_PLAYER:
      return {
        ...state,
        data: action.response.data
      };
    default:
      return state;
  }
};

const profileWL = (state = {}, action) => {
  switch (action.type) {
    case GET_PLAYER_WL:
      return {
        ...state,
        data: action.response.data
      };
    default:
      return state;
  }
};

const profileRanking = (state = {}, action) => {
  switch (action.type) {
    case GET_PLAYER_RANKING:
      return {
        ...state,
        data: action.response.data
      };
    default:
      return state;
  }
};

export default combineReducers({
  profile,
  profileWL,
  profileRanking
});
