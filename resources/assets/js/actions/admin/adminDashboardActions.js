import * as apiActions from '../apiActions';
import { displaySuccessAlert, displayErrorAlert } from '../alertsActions';

const API_CREATE_USER = '/api/user/new';
const ADMIN_TEACHER_URL = '/api/teacher';
const ADMIN_GROUPS_URL = '/api/school/group';
const ADMIN_STUDENT_GROUP_URL = '/api/groups';
const ADMIN_ADMINISTRATOR_URL = '/api/administrator';
const CREATE_TEACHER = 'CREATE_TEACHER';
const CREATE_GROUP = 'CREATE_GROUP';
const CREATE_ADMIN = 'CREATE_ADMIN';
const UPDATE_TEACHER = 'UPDATE_TEACHER';
const UPDATE_GROUP = 'UPDATE_GROUP';
const UPDATE_ADMIN = 'UPDATE_ADMIN';
const DELETE_TEACHER = 'DELETE_TEACHER';
const DELETE_GROUP = 'DELETE_GROUP';
const DELETE_ADMIN = 'DELETE_ADMIN';
export const TEACHER_CREATED = 'TEACHER_CREATED';
export const ADMINISTRATOR_CREATED = 'ADMINISTRATOR_CREATED';
export const GROUP_CREATED = 'GROUP_CREATED';
export const ERROR_TEACHER_CREATED = 'ERROR_TEACHER_CREATED';
export const ERROR_ADMINISTRATOR_CREATED = 'ERROR_ADMINISTRATOR_CREATED';
export const ERROR_GROUP_CREATED = 'ERROR_GROUP_CREATED';
export const TEACHER_UPDATED = 'TEACHER_UPDATED';
export const ADMINISTRATOR_UPDATED = 'ADMINISTRATOR_UPDATED';
export const GROUP_UPDATED = 'GROUP_UPDATED';
export const ERROR_TEACHER_UPDATED = 'ERROR_TEACHER_UPDATED';
export const ERROR_ADMINISTRATOR_UPDATED = 'ERROR_ADMINISTRATOR_UPDATED';
export const ERROR_GROUP_UPDATED = 'ERROR_GROUP_UPDATED';
export const TEACHER_DELETED = 'TEACHER_DELETED';
export const ADMINISTRATOR_DELETED = 'ADMINISTRATOR_DELETED';
export const GROUP_DELETED = 'GROUP_DELETED';
export const ERROR_TEACHER_DELETED = 'ERROR_TEACHER_DELETED';
export const ERROR_ADMINISTRATOR_DELETED = 'ERROR_ADMINISTRATOR_DELETED';
export const ERROR_GROUP_DELETED = 'ERROR_GROUP_DELETED';


const csrfToken = [].slice.call(document.getElementsByTagName('meta'))
    .filter((meta) => meta.name === 'csrf-token')[0].content;

const _headers = {
  'X-CSRF-TOKEN': csrfToken,
  'X-Requested-With': 'XMLHttpRequest'
};


export function createTeacher({ name, email, password, user_id }) {
  return (dispatch, getState) => {
    const schoolId = getState().adminReducer.school.id;
    return apiActions.postRequest(ADMIN_TEACHER_URL,
      { user_id,  school_id: schoolId },
      _headers)
    .then(
      res => dispatch(teacherCreated(res)),
      err => dispatch(errorTeacherCreated(err))
    );
  }
}

function teacherCreated(data) {
  return {
    type: TEACHER_CREATED,
    data: data
  };
}

function errorTeacherCreated(data) {
  return {
    type: ERROR_TEACHER_CREATED,
    data: data.errors
  };
}

// export function createAdmin({ name, email, password }) {
//   return (dispatch, getState) => {
//     const schoolId = getState().adminReducer.school.id;
//     return apiActions.postRequest(API_CREATE_USER, {
//       name, email, password
//     }, _headers).then(
//       res => apiActions.postRequest(ADMIN_ADMINISTRATOR_URL,
//         { name, email, password, school_id: schoolId },
//         _headers).then(
//           res => dispatch(adminCreated(res)),
//           err => dispatch(errorAdminCreated(err))
//         ),
//       err => { console.log('error when creating user'); }
//     );
//   }
// }

export function createAdmin({ user_id }) {
  return (dispatch, getState) => {
    const schoolId = getState().adminReducer.school.id;
    return apiActions.postRequest(ADMIN_ADMINISTRATOR_URL,
      { user_id,  school_id: schoolId },
      _headers)
    .then(
      res => dispatch(adminCreated(res)),
      err => dispatch(errorAdminCreated(err))
    );
  }
}

function adminCreated(data) {
  return {
    type: ADMINISTRATOR_CREATED,
    data: data
  };
}

function errorAdminCreated(data) {
  return {
    type: ERROR_ADMINISTRATOR_CREATED,
    data: data.errors
  };
}

export function createGroup({ name, grade, nickname }) {
  return (dispatch, getState) => {
    const schoolId = getState().adminReducer.school.id;
    return apiActions.postRequest(ADMIN_GROUPS_URL,
      { name, grade, nickname, school_id: schoolId }, _headers).then(
        res => dispatch(groupCreated(res)),
        err => dispatch(errorGroupCreated(err))
    );
  }
}

function groupCreated(data) {
  return {
    type: GROUP_CREATED,
    data: data
  };
}

function errorGroupCreated(data) {
  return {
    type: GROUP_CREATED,
    data: data.errors
  };
}
