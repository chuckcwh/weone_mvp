import { fetchData } from '../middleware/api';
import { GET_PRO_PLAYERS, GET_PLAYER_RANKINGS_BY_HERO } from './type';

export const getProPlayers = () =>
  fetchData({
    type: GET_PRO_PLAYERS,
    endpoint: '/proPlayers',
    method: 'get'
  });

export const getPlayerRankingsByHero = () =>
  fetchData({
    type: GET_PLAYER_RANKINGS_BY_HERO,
    endpoint: '/rankings',
    method: 'get'
  });
