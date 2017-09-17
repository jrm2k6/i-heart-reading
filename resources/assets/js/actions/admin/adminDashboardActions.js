import * as apiActions from '../apiActions';
import { displaySuccessAlert, displayErrorAlert } from '../alertsActions';

const API_CREATE_USER = '/api/user/new';
const ADMIN_TEACHER_URL = '/api/teacher';
const ADMIN_SCHOOL_GROUPS_URL = '/api/admin/group';
const ADMIN_GROUP_URL = '/api/group';
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
const CREATE_TRANSFER_GROUP = 'CREATE_TRANSFER_GROUP';
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
export const ERROR_TRANSFER_GROUP = 'ERROR_TRANSFER_GROUP';
export const GROUP_TRANSFERRED = 'GROUP_TRANSFERRED';
export const ERROR_TRANSFER_STUDENTS = 'ERROR_TRANSFER_STUDENTS';
export const STUDENTS_TRANSFERRED = 'STUDENTS_TRANSFERRED';
export const ERROR_FETCH_STUDENTS_GROUP = 'ERROR_FETCH_STUDENTS_GROUP';
export const STUDENTS_GROUP_FETCHED = 'STUDENTS_GROUP_FETCHED';
export const ERROR_FETCH_ALL_STUDENTS_GROUP_EXCEPT = 'ERROR_FETCH_ALL_STUDENTS_GROUP_EXCEPT';
export const FETCH_ALL_STUDENTS_GROUP_EXCEPT_FETCHED = 'FETCH_ALL_STUDENTS_GROUP_EXCEPT_FETCHED';


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
      res => {
        dispatch(teacherCreated(res));
        dispatch(displaySuccessAlert('Teacher successfully created!'));
      },
      err => {
        dispatch(errorTeacherCreated(err));
        dispatch(displayErrorAlert('Error creating teacher!'));
      }
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

export function deleteTeacher(id) {
  return dispatch => {
    return apiActions.deleteRequest(`${ADMIN_TEACHER_URL}/${id}`, _headers)
    .then(
      res => {
        dispatch(teacherDeleted(id));
        dispatch(displaySuccessAlert('Teacher successfully deleted!'));
      },
      err => {
        dispatch(errorTeacherDeleted(err));
        dispatch(displayErrorAlert('Error deleting teacher!'));
      }
    );
  }
}

function teacherDeleted(id) {
  return {
    type: TEACHER_DELETED,
    data: { idTeacherDeleted: id }
  };
}

function errorTeacherDeleted(data) {
  return {
    type: ERROR_TEACHER_DELETED,
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
      res => {
        dispatch(adminCreated(res));
        dispatch(displaySuccessAlert('Admin successfully created!'));
      },
      err => {
        dispatch(errorAdminCreated(err));
        dispatch(displaySuccessAlert('Error creating admin'));
      }
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

export function deleteAdmin(userId) {
  return dispatch => {
    return apiActions.deleteRequest(`${ADMIN_ADMINISTRATOR_URL}/${userId}`, _headers)
    .then(
      res => {
        dispatch(adminDeleted(userId));
        dispatch(displaySuccessAlert('Admin successfully deleted!'));
      },
      err => {
        dispatch(errorAdminDeleted(err));
        dispatch(displayErrorAlert('Error deleting admin!'));
      }
    );
  }
}

function adminDeleted(userId) {
  return {
    type: ADMINISTRATOR_DELETED,
    data: { idAdminDeleted: userId }
  };
}

function errorAdminDeleted(data) {
  return {
    type: ERROR_ADMINISTRATOR_DELETED,
    data: data.errors
  };
}

export function createGroup({ name, grade, nickname, teacherId }) {
  return (dispatch, getState) => {
    const schoolId = getState().adminReducer.school.id;
    return apiActions.postRequest(ADMIN_SCHOOL_GROUPS_URL,
      { name, grade, nickname, school_id: schoolId, teacher_id: teacherId }, _headers).then(
        res => {
          dispatch(groupCreated(res));
          dispatch(displaySuccessAlert('Group successfully created!'));
        },
        err => {
          dispatch(errorGroupCreated(err));
          dispatch(displayErrorAlert('Error creating group!'));
        }
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
    type: ERROR_GROUP_CREATED,
    data: data.errors
  };
}

export function deleteGroup(groupId) {
  return dispatch => {
    return apiActions.deleteRequest(`${ADMIN_SCHOOL_GROUPS_URL}/${groupId}`, _headers).then(
        res => {
          dispatch(groupDeleted(groupId));
          dispatch(displaySuccessAlert('Group successfully deleted!'));
        },
        err => {
          dispatch(errorGroupDeleted(err));
          dispatch(displayErrorAlert('Error deleting group!'));
        }
    );
  }
}

function groupDeleted(groupId) {
  return {
    type: GROUP_DELETED,
    data: {
      idGroupDeleted: groupId
    }
  };
}

function errorGroupDeleted(data) {
  return {
    type: ERROR_GROUP_DELETED,
    data: data.errors
  };
}

export function archiveGroup(groupId) {
  return dispatch => {
    return apiActions.putRequest(`${ADMIN_SCHOOL_GROUPS_URL}/${groupId}`, { is_archived: true }, _headers).then(
        res => {
          dispatch(groupArchived(groupId));
          dispatch(displaySuccessAlert('Group successfully archived!'));
        },
        err => {
          dispatch(errorGroupArchived(err));
          dispatch(displayErrorAlert('Error archiving group!'));
        }
    );
  }
}

function groupArchived(groupId) {
  return {
    type: GROUP_UPDATED,
    data: {
      idGroupDeleted: groupId
    }
  };
}

function errorGroupArchived(data) {
  return {
    type: ERROR_GROUP_UPDATED,
    data: data.errors
  };
}

export function createGroupTransfer(groupId, teacherId) {
  return dispatch => {
    return apiActions.putRequest(`${ADMIN_SCHOOL_GROUPS_URL}/${groupId}` ,
      { teacher_id: teacherId }, _headers).then(
        res => {
          dispatch(groupTransferred(res));
          dispatch(displaySuccessAlert('Group transferred!'));
        },
        err => {
          dispatch(errorTransferGroup(err));
          dispatch(displayErrorAlert('Error transferring group!'));
        }
    );
  };
}

function groupTransferred(data) {
  return {
    type: GROUP_TRANSFERRED,
    data: data
  };
}

function errorTransferGroup(data) {
  return {
    type: ERROR_TRANSFER_GROUP,
    data: data.errors
  };
}

export function createStudentsTransfer(groupId, studentIds) {
  return dispatch => {
    return apiActions.putRequest(`${ADMIN_GROUP_URL}/${groupId}/students`,
    { group_id: groupId, student_ids: studentIds }, _headers).then(
        res => {
          dispatch(studentsTransferred(res));
          dispatch(displaySuccessAlert('Students transferred!'));
        },
        err => {
          dispatch(displayErrorAlert('Error transferring students!'));
          dispatch(errorTransferStudents(err));
        }
    );
  }
}

function studentsTransferred(data) {
  return {
    type: STUDENTS_TRANSFERRED,
    data: data
  };
}

function errorTransferStudents(data) {
  return {
    type: ERROR_TRANSFER_STUDENTS,
    data: data.errors
  };
}

export function fetchStudentsGroup(groupId) {
  return dispatch => {
    return apiActions.getRequest(`${ADMIN_GROUP_URL}/${groupId}/students`).then(
        res => dispatch(studentGroupFetched(res)),
        err => dispatch(errorFetchStudentsGroup(err))
    );
  }
}

function studentGroupFetched(data) {
  return {
    type: STUDENTS_GROUP_FETCHED,
    data: [data]
  };
}

function errorFetchStudentsGroup(data) {
  return {
    type: ERROR_FETCH_STUDENTS_GROUP,
    data: data.errors
  };
}

export function fetchStudentGroupsExcept(groupId) {
  return dispatch => {
    return apiActions.getRequest(`${ADMIN_GROUP_URL}/students/all?blacklist=${groupId}`)
      .then(
        res => dispatch(studentsGroupExceptFetched(res)),
        err => dispatch(errorStudentsGroupExcept(err))
      );
  }
}

function studentsGroupExceptFetched(data) {
  return {
    type: FETCH_ALL_STUDENTS_GROUP_EXCEPT_FETCHED,
    data
  };
}

function errorStudentsGroupExcept(data) {
  return {
    type: ERROR_FETCH_ALL_STUDENTS_GROUP_EXCEPT,
    data: data.errors
  };
}
