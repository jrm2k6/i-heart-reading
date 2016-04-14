import * as apiActions from './apiActions';

export const ASSIGNED_BOOKS_FETCHED = 'ASSIGNED_BOOKS_FETCHED';
export const ASSIGNMENT_CREATED = 'ASSIGNMENT_CREATED';
export const ASSIGNMENT_DELETED = 'ASSIGNMENT_DELETED';
export const ASSIGNMENT_PROGRESS_UPDATED = 'ASSIGNMENT_PROGRESS_UPDATED';
export const BOOKS_FETCHED = 'BOOKS_FETCHED';
export const BOOK_CREATED = 'BOOK_CREATED';
export const CREATE_BOOK = 'CREATE_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';
export const ERROR_ASSIGNED_BOOK_FETCHED = 'ERROR_ASSIGNED_BOOK_FETCHED';
export const ERROR_ASSIGNMENT_CREATED = 'ERROR_ASSIGNMENT_CREATED';
export const ERROR_ASSIGNMENT_DELETED = 'ERROR_ASSIGNMENT_DELETED';
export const ERROR_ASSIGNMENT_PROGRESS_UPDATED = 'ERROR_ASSIGNMENT_PROGRESS_UPDATED';
export const ERROR_BOOK_CREATED = 'ERROR_BOOK_CREATED';
export const ERROR_BOOKS_FETCHED = 'ERROR_BOOKS_FETCHED';
export const ERROR_MARKED_BOOK_AS_READ = 'ERROR_MARKED_BOOK_AS_READ';
export const MARK_BOOK_AS_READ = 'MARK_BOOK_AS_READ';
export const MARKED_BOOK_AS_READ = 'MARKED_BOOK_AS_READ';
export const SAVE_RESPONSE = 'SAVE_RESPONSE';
export const SUCCESS_SAVE_RESPONSE = 'SUCCESS_SAVE_RESPONSE';
export const ERROR_SAVE_RESPONSE = 'ERROR_SAVE_RESPONSE';
export const UPDATE_ASSIGNMENT_PROGRESS = 'UPDATE_ASSIGNMENT_PROGRESS';
export const UPDATE_BOOK = 'UPDATE_BOOK';

export const API_ASSIGNED_BOOKS_RESOURCE_URL = '/api/books/me';
export const API_BOOKS_RESOURCE_URL = '/api/books';
export const API_BOOKS_ASSIGNMENT_RESOURCE_URL = '/api/assignments';
export const API_BOOKS_ASSIGNMENT_PROGRESS_RESOURCE_URL = '/api/assignment-progress';
export const API_RESPONSES_RESOURCE_URL = '/api/responses';

const csrfToken = [].slice.call(document.getElementsByTagName('meta'))
    .filter((meta) => meta.name === 'csrf-token')[0].content;

const _headers = {
  'X-CSRF-TOKEN': csrfToken
};

export function booksFetched(data) {
  return {
    type: BOOKS_FETCHED,
    payload: data
  };
}

export function errorBooksFetched() {
  return {
    type: ERROR_BOOKS_FETCHED
  };
}

export function fetchBooks() {
  return apiActions.getRequest(API_BOOKS_RESOURCE_URL, booksFetched, errorBooksFetched);
}

export function assignedBooksFetched(data) {
  return {
    type: ASSIGNED_BOOKS_FETCHED,
    payload: data
  };
}

export function errorAssignedBooksFetched() {
  return {
    type: ERROR_ASSIGNED_BOOK_FETCHED
  };
}

export function fetchAssignedBooks() {
  return apiActions.getRequest(API_ASSIGNED_BOOKS_RESOURCE_URL, assignedBooksFetched,
    errorAssignedBooksFetched);
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

export function createAssignment(bookId, userId) {
  return apiActions.postRequest(API_BOOKS_ASSIGNMENT_RESOURCE_URL,
    { book_id: bookId, user_id: userId },
    assignmentCreated, errorAssignmentCreated, _headers);
}

export function bookCreated(data) {
  return (dispatch, getStore) => {
    const userId = getStore().userProfileReducer.user.id;
    dispatch(createAssignment(data.book.id, userId));
  };
}

export function errorBookCreated() {
  return {
    type: ERROR_BOOK_CREATED
  };
}

export function createBook(dataBook) {
  return apiActions.postRequest(API_BOOKS_RESOURCE_URL, dataBook,
    bookCreated, errorBookCreated, _headers);
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
  const successAssignmentDeleted = () => assignmentDeleted(id);
  return apiActions.deleteRequest(`${API_BOOKS_ASSIGNMENT_RESOURCE_URL}/${id}`,
    successAssignmentDeleted, errorAssignmentDeleted, _headers);
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
  const dataProgress = {
    id: _id,
    num_pages_read: _numPages
  };
  const url = `${API_BOOKS_ASSIGNMENT_PROGRESS_RESOURCE_URL}/${_id}`;
  return apiActions.putRequest(url, dataProgress,
    assignmentProgressUpdated, errorAssignmentProgressUpdated, _headers);
}

export function markedBookAsReadSuccess(data) {
  return {
    type: MARKED_BOOK_AS_READ,
    payload: data
  };
}

export function errorMarkBookAsRead() {
  return {
    type: ERROR_MARKED_BOOK_AS_READ
  };
}

export function markBookAsRead(_id) {
  const url = `${API_BOOKS_ASSIGNMENT_PROGRESS_RESOURCE_URL}/${_id}/read`;
  return apiActions.putRequest(url, {},
    markedBookAsReadSuccess, errorMarkBookAsRead, _headers);
}

function errorSaveResponse() {
  return {
    type: ERROR_SAVE_RESPONSE
  };
}

function successSaveResponse(data) {
  return {
    type: SUCCESS_SAVE_RESPONSE,
    payload: data
  };
}

function successCreateResponse(assignmendId, res) {
  return (dispatch, getStore) => {
    const userId = getStore().userProfileReducer.user.id;
    const assignments = getStore().bookReducers.assignedBooks;
    const currentAssignment = assignments.find(
      assignment => parseInt(assignmendId, 10) === assignment.id
    );

    const url = `${API_BOOKS_ASSIGNMENT_RESOURCE_URL}/${assignmendId}`;
    const data = {
      response_id: res.response.id,
      user_id: userId,
      book_id: currentAssignment.book.id
    };

    dispatch(apiActions.putRequest(url, data,
      successSaveResponse, errorSaveResponse, _headers));
  };
}

export function saveResponse(props) {
  const data = { type: props.type };
  const attachments = {};

  switch (data.type) {
    case 'text':
      data.content = props.content;
      break;

    case 'image':
      data.attachments = props.file;
      break;

    default:
      break;
  }

  const assignmentId = props.assignmentId;
  return apiActions.postRequest(API_RESPONSES_RESOURCE_URL, data,
    res => { return successCreateResponse(assignmentId, res); }, errorSaveResponse, _headers);
}
