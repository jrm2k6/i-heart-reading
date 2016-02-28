import request from 'superagent';
import { getRequest } from './apiActions';

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

const URL_ME = '/api/me';

export function fetchUser() {
  return getRequest(URL_ME, userFetched, errorUserFetched);
}

export function userFetched(data) {
  return {
    type: FETCH_USER_SUCCESS,
    payload: data.body
  };
}

export function errorUserFetched(err) {
  return {
    type: FETCH_USER_ERROR,
    payload: err
  };
}
