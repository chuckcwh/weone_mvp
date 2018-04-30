import { fetchData } from '../middleware/api';
import { GET_MATCH, GET_PRO_MATCHES, GET_PUBLIC_MATCHES } from './type';

export const getMatch = params =>
  fetchData({
    type: GET_MATCH,
    endpoint: '/matches/:match_id',
    method: 'get',
    params
  });

export const getProMatches = () =>
  fetchData({
    type: GET_PRO_MATCHES,
    endpoint: '/proMatches',
    method: 'get'
  });

export const getPublicMatches = () =>
  fetchData({
    type: GET_PUBLIC_MATCHES,
    endpoint: '/publicMatches',
    method: 'get'
  });
