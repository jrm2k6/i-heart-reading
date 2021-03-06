import * as apiActions from './apiActions';
import { displaySuccessAlert, displayErrorAlert } from './alertsActions';

export const ASSIGNED_BOOKS_FETCHED = 'ASSIGNED_BOOKS_FETCHED';
export const ASSIGNMENT_CREATED = 'ASSIGNMENT_CREATED';
export const ASSIGNMENT_DELETED = 'ASSIGNMENT_DELETED';
export const ASSIGNMENT_PROGRESS_UPDATED = 'ASSIGNMENT_PROGRESS_UPDATED';
export const BOOKS_FETCHED = 'BOOKS_FETCHED';
export const BOOK_CREATED = 'BOOK_CREATED';
export const CREATE_BOOK = 'CREATE_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';
export const ERROR_ASSIGNED_BOOK_FETCHED = 'ERROR_ASSIGNED_BOOK_FETCHED';
export const ERROR_MY_UPDATES_FETCHED = 'ERROR_MY_UPDATES_FETCHED';
export const ERROR_UPDATES_FETCHED = 'ERROR_MY_UPDATES_FETCHED';
export const ERROR_ASSIGNMENT_CREATED = 'ERROR_ASSIGNMENT_CREATED';
export const ERROR_ASSIGNMENT_DELETED = 'ERROR_ASSIGNMENT_DELETED';
export const ERROR_ASSIGNMENT_PROGRESS_UPDATED = 'ERROR_ASSIGNMENT_PROGRESS_UPDATED';
export const ERROR_BOOK_CREATED = 'ERROR_BOOK_CREATED';
export const ERROR_BOOKS_FETCHED = 'ERROR_BOOKS_FETCHED';
export const ERROR_MARKED_BOOK_AS_READ = 'ERROR_MARKED_BOOK_AS_READ';
export const ERROR_MY_STATS_FETCHED = 'ERROR_MY_STATS_FETCHED';
export const ERROR_STATS_FETCHED = 'ERROR_STATS_FETCHED';
export const MARK_BOOK_AS_READ = 'MARK_BOOK_AS_READ';
export const MARKED_BOOK_AS_READ = 'MARKED_BOOK_AS_READ';
export const SAVE_RESPONSE = 'SAVE_RESPONSE';
export const SUCCESS_SAVE_RESPONSE = 'SUCCESS_SAVE_RESPONSE';
export const SUCCESS_MY_STATS_FETCHED = 'SUCCESS_MY_STATS_FETCHED';
export const SUCCESS_MY_UPDATES_FETCHED = 'SUCCESS_MY_UPDATES_FETCHED';
export const SUCCESS_STATS_FETCHED = 'SUCCESS_STATS_FETCHED';
export const SUCCESS_UPDATES_FETCHED = 'SUCCESS_UPDATES_FETCHED';
export const ERROR_SAVE_RESPONSE = 'ERROR_SAVE_RESPONSE';
export const UPDATE_ASSIGNMENT_PROGRESS = 'UPDATE_ASSIGNMENT_PROGRESS';
export const UPDATE_BOOK = 'UPDATE_BOOK';

export const API_ASSIGNED_BOOKS_RESOURCE_URL = '/api/books/me';
export const API_BOOKS_RESOURCE_URL = '/api/books';
export const API_BOOKS_ASSIGNMENT_RESOURCE_URL = '/api/assignments';
export const API_BOOKS_ASSIGNMENT_PROGRESS_RESOURCE_URL = '/api/assignment-progress';
export const API_RESPONSES_RESOURCE_URL = '/api/responses';
export const API_MY_STATS_RESOURCE_URL = '/api/stats/me';
export const API_STATS_RESOURCE_URL = '/api/stats';
export const API_MY_UPDATES_RESOURCE_URL = '/api/updates/me';
export const API_UPDATES_RESOURCE_URL = '/api/updates';

const csrfToken = [].slice.call(document.getElementsByTagName('meta'))
    .filter((meta) => meta.name === 'csrf-token')[0].content;

const _headers = {
  'X-CSRF-TOKEN': csrfToken,
  'X-Requested-With': 'XMLHttpRequest'
};

function booksFetched(data) {
  return {
    type: BOOKS_FETCHED,
    payload: data
  };
}

function errorBooksFetched() {
  return dispatch => {
    dispatch(displayErrorAlert('Error while fetching existing books!'));
    return {
      type: ERROR_BOOKS_FETCHED
    };
  };
}

export function fetchBooks() {
  return dispatch => {
    return apiActions.getRequest(API_BOOKS_RESOURCE_URL).then(
      (res) => { dispatch(booksFetched(res)); },
      (err) => { dispatch(errorBooksFetched(err)); });
  };
}

function statsFetched(data, studentId) {
  return {
    type: SUCCESS_STATS_FETCHED,
    payload: {
      stats: data.stats,
      studentId
    }
  };
}

function errorStatsFetched(err) {
  return {
    type: ERROR_STATS_FETCHED,
    payload: err
  };
}

export function fetchStats(studentId) {
  return dispatch => {
    return apiActions.getRequest(`${API_STATS_RESOURCE_URL}/${studentId}`).then(
      (res) => { dispatch(statsFetched(res, studentId)); },
      (err) => { dispatch(errorStatsFetched(err)); });
  };
}

function myStatsFetched(data) {
  return {
    type: SUCCESS_MY_STATS_FETCHED,
    payload: data
  };
}

function errorMyStatsFetched() {
  return {
    type: ERROR_MY_STATS_FETCHED
  };
}

export function fetchMyStats() {
  return dispatch => {
    return apiActions.getRequest(API_MY_STATS_RESOURCE_URL).then(
      (res) => { dispatch(myStatsFetched(res)); },
      (err) => { dispatch(errorMyStatsFetched(err)); });
  };
}


function myUpdatesFetched(data) {
  return {
    type: SUCCESS_MY_UPDATES_FETCHED,
    payload: data.updates
  };
}

function errorMyUpdatesFetched() {
  return {
    type: ERROR_MY_UPDATES_FETCHED
  };
}

export function fetchMyUpdates() {
  return dispatch => {
    return apiActions.getRequest(API_MY_UPDATES_RESOURCE_URL).then(
      res => { dispatch(myUpdatesFetched(res)); },
      err => { dispatch(errorMyUpdatesFetched(err)); }
    );
  };
}

function updatesFetched(data, studentId) {
  return {
    type: SUCCESS_UPDATES_FETCHED,
    payload: {
      updates: data.updates,
      studentId
    }
  };
}

function errorUpdatesFetched() {
  return {
    type: ERROR_UPDATES_FETCHED
  };
}

export function fetchUpdates(studentId) {
  return dispatch => {
    return apiActions.getRequest(`${API_UPDATES_RESOURCE_URL}/${studentId}`).then(
      res => { dispatch(updatesFetched(res, studentId)); },
      err => { dispatch(errorUpdatesFetched(err)); }
    );
  };
}

export function assignedBooksFetched(data) {
  return {
    type: ASSIGNED_BOOKS_FETCHED,
    payload: data
  };
}

export function errorAssignedBooksFetched() {
  return dispatch => {
    dispatch(displayErrorAlert('Error while fetching your books!'));
    return {
      type: ERROR_ASSIGNED_BOOK_FETCHED
    };
  };
}

export function fetchAssignedBooks() {
  return dispatch => {
    return apiActions.getRequest(API_ASSIGNED_BOOKS_RESOURCE_URL).then(
      res => { dispatch(assignedBooksFetched(res)); },
      err => { dispatch(errorAssignedBooksFetched(err)); }
    );
  };
}


export function assignmentCreated(data) {
  return dispatch => {
    dispatch(displaySuccessAlert('Assignment successfully created!'));
    return {
      type: ASSIGNMENT_CREATED,
      payload: data
    };
  }
}

export function errorAssignmentCreated(data) {
  return dispatch => {
    dispatch(displayErrorAlert('Error when creating assignment!'));
    return {
      type: ERROR_ASSIGNMENT_CREATED,
      payload: data
    };
  };
}

export function createAssignment(bookId, userId) {
  return dispatch => {
    return apiActions.postRequest(API_BOOKS_ASSIGNMENT_RESOURCE_URL,
      { book_id: bookId, user_id: userId }, _headers).then(
        res => dispatch(assignmentCreated(res)),
        err => dispatch(errorAssignmentCreated(err))
    );
  };
}

export function bookCreated(data) {
  return (dispatch, getState) => {
    const userId = getState().userProfileReducer.user.id;
    return dispatch(createAssignment(data.book.id, userId));
  };
}

export function errorBookCreated() {
  return {
    type: ERROR_BOOK_CREATED
  };
}

export function createBook(dataBook) {
  return dispatch => {
    return apiActions.postRequest(API_BOOKS_RESOURCE_URL, dataBook, _headers).then(
      res => dispatch(bookCreated(res)),
      err => dispatch(errorBookCreated(err))
    );
  };
}

export function assignmentDeleted(_id) {
  return {
    type: ASSIGNMENT_DELETED,
    payload: { id: _id }
  };
}

export function errorAssignmentDeleted() {
  return {
    type: ERROR_ASSIGNMENT_DELETED
  };
}

export function deleteAssignment(id) {
  return dispatch => {
    const successAssignmentDeleted = () => {
      dispatch(displaySuccessAlert('Book successfully deleted!'));
      return dispatch(assignmentDeleted(id));
    };

    return apiActions.deleteRequest(`${API_BOOKS_ASSIGNMENT_RESOURCE_URL}/${id}`, _headers).then(
      () => dispatch(successAssignmentDeleted()),
      () => dispatch(errorAssignmentDeleted())
    );
  };
}

export function assignmentProgressUpdated(data) {
  return {
    type: ASSIGNMENT_PROGRESS_UPDATED,
    payload: data
  };
}

export function errorAssignmentProgressUpdated() {
  return {
    type: ERROR_ASSIGNMENT_PROGRESS_UPDATED
  };
}

export function updateAssignmentProgress(_id, _numPages) {
  return dispatch => {
    const dataProgress = {
      id: _id,
      num_pages_read: _numPages
    };
    const url = `${API_BOOKS_ASSIGNMENT_PROGRESS_RESOURCE_URL}/${_id}`;
    return apiActions.putRequest(url, dataProgress, _headers).then(
      res => dispatch(assignmentProgressUpdated(res)),
      err => dispatch(errorAssignmentProgressUpdated(err))
    );
  };
}

export function markedBookAsReadSuccess(data) {
  return {
    type: MARKED_BOOK_AS_READ,
    payload: data
  };
}

export function errorMarkBookAsRead() {
  return dispatch => {
    dispatch(displayErrorAlert('Error when marking book as read!'));

    return {
      type: ERROR_MARKED_BOOK_AS_READ
    };
  };
}

export function markBookAsRead(_id) {
  const url = `${API_BOOKS_ASSIGNMENT_PROGRESS_RESOURCE_URL}/${_id}/read`;
  return dispatch => {
    return apiActions.putRequest(url, {}, _headers).then(
        res => {
          dispatch(displaySuccessAlert('Book marked as read!'));
          return dispatch(markedBookAsReadSuccess(res))
        },
        err => dispatch(errorMarkBookAsRead(err))
      );
  };
}

function errorSaveResponse() {
  return dispatch => {
    dispatch(displayErrorAlert('Error when saving response!'));

    return {
      type: ERROR_SAVE_RESPONSE
    };
  };
}

function successSaveResponse(data) {
  return dispatch => {
    dispatch(displaySuccessAlert('Response successfully saved!'));
    return {
      type: SUCCESS_SAVE_RESPONSE,
      payload: data
    };
  };
}

function successCreateResponse(assignmendId, res) {
  return (dispatch, getState) => {
    const userId = getState().userProfileReducer.user.id;
    const assignments = getState().bookReducers.assignedBooks;
    const currentAssignment = assignments.find(
      assignment => parseInt(assignmendId, 10) === assignment.id
    );

    const url = `${API_BOOKS_ASSIGNMENT_RESOURCE_URL}/${assignmendId}`;
    const data = {
      response_id: res.response.id,
      user_id: userId,
      book_id: currentAssignment.book.id
    };

    return apiActions.putRequest(url, data, _headers).then(
        _res => dispatch(successSaveResponse(_res)),
        err => dispatch(errorSaveResponse(err))
      );
  };
}

export function saveResponse(props) {
  const assignmentId = props.assignmentId;
  const data = { type: props.type };
  const attachments = [];

  switch (data.type) {
    case 'text':
      data.content = props.content;
      break;

    case 'image':
      attachments.push({ file: props.file, fieldName: 'file' });
      break;

    case 'video':
    case 'link':
      data.url = props.url;
      break;

    default:
      break;
  }

  if (attachments.length > 0) {
    return dispatch => {
      return apiActions.postRequestWithAttachments(API_RESPONSES_RESOURCE_URL, data,
        attachments, _headers).then(
        res => dispatch(successCreateResponse(assignmentId, res)),
        err => dispatch(errorSaveResponse(err))
      );
    };
  }

  return dispatch => {
    return apiActions.postRequest(API_RESPONSES_RESOURCE_URL, data, _headers).then(
        res => dispatch(successCreateResponse(assignmentId, res)),
        err => dispatch(errorSaveResponse(err))
      );
  };
}
