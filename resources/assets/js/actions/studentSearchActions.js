import { getRequest } from './apiActions';

export const FETCH_STUDENT_SUCCESS = 'FETCH_STUDENT_SUCCESS';
export const FETCH_STUDENT_ERROR = 'FETCH_STUDENT_ERROR';

const URL_FETCH_STUDENT = '/api/user/';

function fetchStudentSuccess(res) {
  return {
    type: FETCH_STUDENT_SUCCESS,
    payload: res
  };
}

function fetchStudentError() {
  return {
    type: FETCH_STUDENT_ERROR
  };
}

export function fetchStudent(studentId) {
  return dispatch => {
    return getRequest(`${URL_FETCH_STUDENT}${studentId}`).then(
      res => { dispatch(fetchStudentSuccess(res)); },
      err => { dispatch(fetchStudentError(err)); }
    );
  };
}
