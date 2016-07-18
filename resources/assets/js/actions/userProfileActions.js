import { getRequest } from './apiActions';

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

const URL_ME = '/api/user/me';

export function userFetched(data) {
  return {
    type: FETCH_USER_SUCCESS,
    payload: data.user
  };
}

export function errorUserFetched(err) {
  return {
    type: FETCH_USER_ERROR,
    payload: err
  };
}

export function fetchUser() {
  return dispatch => {
    return getRequest(URL_ME).then(
      res => { dispatch(userFetched(res)); },
      err => { dispatch(errorUserFetched(err)); }
    );
  };
}
