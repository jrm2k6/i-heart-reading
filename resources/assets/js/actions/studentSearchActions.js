import { getRequest } from './apiActions';

export const FETCH_STUDENT_SUCCESS = 'FETCH_STUDENT_SUCCESS';
export const FETCH_STUDENT_ERROR = 'FETCH_STUDENT_ERROR';

export const SEARCH_STUDENTS_SUCCESS = 'SEARCH_STUDENTS_SUCCESS';
export const SEARCH_STUDENTS_ERROR = 'SEARCH_STUDENTS_ERROR';

const URL_FETCH_STUDENT = '/api/user/';
const URL_SEARCH_STUDENT = '/api/students/search';

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

function searchStudentsSuccess(res) {
  return {
    type: SEARCH_STUDENTS_SUCCESS,
    payload: res
  };
}

function searchStudentsError(data) {
  return {
    type: SEARCH_STUDENTS_ERROR,
    payload: data
  };
}
export function searchStudent(query) {
  return dispatch => {
    return getRequest(`${URL_SEARCH_STUDENT}?query=${query}`).then(
      res => { dispatch(fetchStudentSuccess(res)); },
      err => { dispatch(fetchStudentError(err)); }
    );
  };
}
