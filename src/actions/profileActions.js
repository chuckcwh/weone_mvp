import { fetchData } from '../middleware/api';
import { GET_PLAYER, GET_PLAYER_WL, GET_PLAYER_RANKING } from './type';

export const getPlayer = params =>
  fetchData({
    type: GET_PLAYER,
    endpoint: '/players/:account_id',
    method: 'get',
    params
  });

export const getPlayerWL = params =>
  fetchData({
    type: GET_PLAYER_WL,
    endpoint: '/players/:account_id/wl',
    method: 'get',
    params
  });

export const getPlayerRanking = params =>
  fetchData({
    type: GET_PLAYER_RANKING,
    endpoint: '/players/:account_id/rankings',
    method: 'get',
    params
  });
