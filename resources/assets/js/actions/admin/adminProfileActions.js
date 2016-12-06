import { getRequest } from '../apiActions';

export const FETCH_ADMIN_USER_SUCCESS = 'FETCH_ADMIN_USER_SUCCESS';
export const FETCH_ADMIN_USER_ERROR = 'FETCH_ADMIN_USER_ERROR';

const URL_ADMIN_ME = '/api/administrator/me';

export function userAdminFetched(data) {
  return {
    type: FETCH_ADMIN_USER_SUCCESS,
    payload: data
  };
}

export function errorAdminFetched(err) {
  return {
    type: FETCH_ADMIN_USER_ERROR,
    payload: err
  };
}

export function fetchAdminUser() {
  return dispatch => {
    return getRequest(URL_ADMIN_ME).then(
      res => dispatch(userAdminFetched(res)),
      err => dispatch(errorAdminFetched(err))
    );
  };
}
