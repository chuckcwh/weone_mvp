import { combineReducers } from 'redux';
import { GET_PRO_PLAYERS, GET_PLAYER_RANKINGS_BY_HERO } from '../actions/type';

const proPlayers = (state = {}, action) => {
  switch (action.type) {
    case GET_PRO_PLAYERS:
      return {
        ...state,
        data: action.response.data
      };
    default:
      return state;
  }
};

const playerRankingsByHero = (state = {}, action) => {
  switch (action.type) {
    case GET_PLAYER_RANKINGS_BY_HERO:
      return {
        ...state,
        data: action.response.data
      };
    default:
      return state;
  }
};

export default combineReducers({
  proPlayers,
  playerRankingsByHero
});
