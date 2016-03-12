import request from 'superagent';
import * as apiActions from './apiActions';

export const ASSIGNMENT_CREATED = 'ASSIGNMENT_CREATED';
export const ASSIGNED_BOOKS_FETCHED = 'ASSIGNED_BOOKS_FETCHED';
export const ASSIGNMENT_DELETED = 'ASSIGNMENT_DELETED';
export const BOOKS_FETCHED = 'BOOKS_FETCHED';
export const BOOK_CREATED = 'BOOK_CREATED';
export const CREATE_BOOK = 'CREATE_BOOK';
export const ERROR_ASSIGNED_BOOK_FETCHED = 'ERROR_ASSIGNED_BOOK_FETCHED';
export const ERROR_ASSIGNMENT_CREATED = 'ERROR_ASSIGNMENT_CREATED';
export const ERROR_ASSIGNMENT_DELETED = 'ERROR_ASSIGNMENT_DELETED';
export const ERROR_BOOK_CREATED = 'ERROR_BOOK_CREATED';
export const ERROR_BOOKS_FETCHED = 'ERROR_BOOKS_FETCHED';
export const DELETE_BOOK = 'DELETE_BOOK';
export const UPDATE_ASSIGNMENT_PROGRESS = 'UPDATE_ASSIGNMENT_PROGRESS';
export const ASSIGNMENT_PROGRESS_UPDATED = 'ASSIGNMENT_PROGRESS_UPDATED';
export const ERROR_ASSIGNMENT_PROGRESS_UPDATED = 'ERROR_ASSIGNMENT_PROGRESS_UPDATED';
export const UPDATE_BOOK = 'UPDATE_BOOK';

export const API_ASSIGNED_BOOKS_RESOURCE_URL = '/api/books/me';
export const API_BOOKS_RESOURCE_URL = '/api/books';
export const API_BOOKS_ASSIGNMENT_RESOURCE_URL = '/api/assignments';
export const API_BOOKS_ASSIGNMENT_PROGRESS_RESOURCE_URL = '/api/assignment-progress';

const csrfToken = [].slice.call(document.getElementsByTagName('meta'))
    .filter((meta) => meta.name === 'csrf-token')[0].content;

const _headers = {
  'X-CSRF-TOKEN': csrfToken
};

export function fetchBooks() {
  return apiActions.getRequest(API_BOOKS_RESOURCE_URL, booksFetched, errorBooksFetched);
}

export function fetchAssignedBooks() {
  return apiActions.getRequest(API_ASSIGNED_BOOKS_RESOURCE_URL, assignedBooksFetched,
    errorAssignedBooksFetched);
}

export function createBook(dataBook) {
  return apiActions.postRequest(API_BOOKS_RESOURCE_URL, dataBook,
    bookCreated, errorBookCreated, _headers);
}

export function createAssignment(bookId, userId) {
  return apiActions.postRequest(API_BOOKS_ASSIGNMENT_RESOURCE_URL,
    { book_id: bookId, user_id: userId },
    assignmentCreated, errorAssignmentCreated, _headers);
}

export function deleteAssignment(id) {
  return apiActions.deleteRequest(`${API_BOOKS_ASSIGNMENT_RESOURCE_URL}/${id}`,
    () => { return assignmentDeleted(id) }, errorAssignmentDeleted, _headers);
}

export function bookCreated(data) {
  return (dispatch, getStore) => {
    const userId = getStore().userProfileReducer.user.id;
    dispatch(createAssignment(data.book.id, userId));
  };
}

export function assignmentCreated(data) {
  return {
    type: ASSIGNMENT_CREATED,
    payload: data
  };
}

export function errorAssignmentCreated(data) {
  return {
    type: ERROR_ASSIGNMENT_CREATED,
    payload: data
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

export function errorBookCreated() {
  return {
    type: ERROR_BOOK_CREATED
  };
}

export function booksFetched(data) {
  return {
    type: BOOKS_FETCHED,
    payload: data
  };
}

export function assignedBooksFetched(data) {
  return {
    type: ASSIGNED_BOOKS_FETCHED,
    payload: data
  };
}

export function errorBooksFetched() {
  return {
    type: ERROR_BOOKS_FETCHED
  };
}

export function errorAssignedBooksFetched() {
  return {
    type: ERROR_ASSIGNED_BOOK_FETCHED
  };
}

export function updateAssignmentProgress(_id, _numPages) {
  let dataProgress = {
    id: _id,
    num_pages_read: _numPages
  };
  const url = `${API_BOOKS_ASSIGNMENT_PROGRESS_RESOURCE_URL}/${_id}`;
  return apiActions.putRequest(url, dataProgress,
    assignmentProgressUpdated, errorAssignmentProgressUpdated, _headers);
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
