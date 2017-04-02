import { getRequest, postRequest } from './apiActions';
import { displaySuccessAlert, displayErrorAlert } from './alertsActions';

export const FETCH_ASSIGNMENTS_TO_REVIEW_SUCCESS = 'FETCH_ASSIGNMENTS_TO_REVIEW_SUCCESS';
export const FETCH_ASSIGNMENTS_TO_REVIEW_ERROR = 'FETCH_ASSIGNMENTS_TO_REVIEW_ERROR';
export const FETCH_COMPLETED_REVIEWS_SUCCESS = 'FETCH_COMPLETED_REVIEWS_SUCCESS';
export const FETCH_COMPLETED_REVIEWS_ERROR = 'FETCH_COMPLETED_REVIEWS_ERROR';
export const FETCH_STUDENT_UPDATES_SUCCESS = 'FETCH_STUDENT_UPDATES_SUCCESS';
export const FETCH_STUDENT_UPDATES_ERROR = 'FETCH_STUDENT_UPDATES_ERROR';
export const GET_CURRENT_RESPONSE_SUCCESS = 'GET_CURRENT_RESPONSE_SUCCESS';
export const GET_CURRENT_ASSIGNMENT_SUCCESS = 'GET_CURRENT_ASSIGNMENT_SUCCESS';
export const CREATE_REVIEW_SUCCESS = 'CREATE_REVIEW_SUCCESS';
export const CREATE_REVIEW_ERROR = 'CREATE_REVIEW_ERROR';

const URL_MY_REVIEWS = '/api/assignment-reviews/me';
const URL_MY_COMPLETED_REVIEWS = '/api/assignment-reviews/me/completed';
const URL_REVIEWS = '/api/assignment-reviews';
const URL_STUDENT_UPDATES = '/api/teacher/me/updates';

const csrfToken = [].slice.call(document.getElementsByTagName('meta'))
    .filter((meta) => meta.name === 'csrf-token')[0].content;

const _headers = {
  'X-CSRF-TOKEN': csrfToken
};

function assignmentToReviewFetched(data) {
  return {
    type: FETCH_ASSIGNMENTS_TO_REVIEW_SUCCESS,
    payload: data.assignment_reviews
  };
}

function assignmentToReviewFetchedError(err) {
  return dispatch => {
    dispatch(displayErrorAlert('Error while fetching your assignments to review!'))
    return {
      type: FETCH_ASSIGNMENTS_TO_REVIEW_ERROR,
      payload: err
    };
  };
}

function getCurrentResponseSuccess(response) {
  return {
    type: GET_CURRENT_RESPONSE_SUCCESS,
    payload: response
  };
}

function getCurrentAssignmentSuccess(assignment) {
  return {
    type: GET_CURRENT_ASSIGNMENT_SUCCESS,
    payload: assignment
  };
}

export function fetchAssignmentsToReview(optionalCallback = null) {
  return dispatch => {
    return getRequest(URL_MY_REVIEWS).then(
      res => {
        if (optionalCallback) {
          optionalCallback(res);
        }

        return dispatch(assignmentToReviewFetched(res));
      },
      err => { dispatch(assignmentToReviewFetchedError(err)); }
    );
  };
}

export function getResponse(responseId) {
  const getCurrentResponse = (assignmentsToReview, _responseId) => {
    return assignmentsToReview.map(assignmentToReview => assignmentToReview.response)
      .find(currentResponse => currentResponse.id === _responseId);
  };
  return (dispatch, getState) => {
    const assignmentsToReview = getState().teacherReviewsReducer.assignmentsToReview;
    if (assignmentsToReview !== null) {
      const response = getCurrentResponse(assignmentsToReview, responseId);
      dispatch(getCurrentResponseSuccess(response));
    } else {
      const successHandler = (data) => {
        const response = getCurrentResponse(data.assignment_reviews, responseId);
        return dispatch(getCurrentResponseSuccess(response));
      };
      dispatch(fetchAssignmentsToReview(successHandler));
    }
  };
}

export function getAssignment(responseId) {
  const getCurrentAssignment = (assignmentsToReview, _responseId) => {
    return assignmentsToReview.filter(assignmentToReview => assignmentToReview.response)
      .find(assignmentToReview => assignmentToReview.response.id === _responseId);
  };

  return (dispatch, getState) => {
    const assignmentsToReview = getState().teacherReviewsReducer.assignmentsToReview;
    if (assignmentsToReview !== null) {
      const assignment = getCurrentAssignment(assignmentsToReview, responseId);
      dispatch(getCurrentAssignmentSuccess(assignment));
    } else {
      const successHandler = (data) => {
        const assignment = getCurrentAssignment(data.assignment_reviews, responseId);
        return dispatch(getCurrentAssignmentSuccess(assignment));
      };
      dispatch(fetchAssignmentsToReview(successHandler));
    }
  };
}

function createReviewError() {
  return dispatch => {
    dispatch(displayErrorAlert('Error while creating review!'));

    return {
      type: CREATE_REVIEW_ERROR
    };
  };
}

function createReviewSuccess() {
  return dispatch => {
    dispatch(displaySuccessAlert('Review successfully created!'));
    return {
      type: CREATE_REVIEW_SUCCESS
    };
  };
}

export function createReview(responseId, props) {
  return dispatch => {
    return postRequest(URL_REVIEWS, props, _headers).then(
      res => { dispatch(createReviewSuccess(res)); },
      err => { dispatch(createReviewError(err)); }
    );
  };
}

function fetchStudentUpdatesSuccess(data) {
  return {
    type: FETCH_STUDENT_UPDATES_SUCCESS,
    payload: data.updates
  };
}

function fetchStudentsUpdatesError() {
  return {
    type: FETCH_STUDENT_UPDATES_ERROR
  };
}

export function fetchStudentsUpdates() {
  return dispatch => {
    return getRequest(URL_STUDENT_UPDATES).then(
      res => { dispatch(fetchStudentUpdatesSuccess(res)); },
      err => { dispatch(fetchStudentsUpdatesError(err)); }
    );
  };
}

function completedReviewsFetched(data) {
  return {
    type: FETCH_COMPLETED_REVIEWS_SUCCESS,
    payload: data.completed_reviews
  };
}

function completedReviewsFetchedError() {
  return dispatch => {
    dispatch(displayErrorAlert('Error while fetching completed reviews!'));
    return {
      type: FETCH_COMPLETED_REVIEWS_ERROR
    };
  };
}

export function fetchCompletedReviews(optionalCallback = null) {
  return dispatch => {
    return getRequest(URL_MY_COMPLETED_REVIEWS).then(
      res => {
        if (optionalCallback) {
          optionalCallback(res);
        }

        return dispatch(completedReviewsFetched(res));
      },
      err => dispatch(completedReviewsFetchedError(err))
    );
  };
}

export function getAcceptedResponse(responseId) {
  const getCurrentResponse = (completedReviews, _responseId) => {
    return completedReviews.map(completedReview => completedReview.response)
      .find(currentResponse => currentResponse.id === _responseId);
  };
  return (dispatch, getState) => {
    const completedReviews = getState().teacherReviewsReducer.completedReviews;
    if (completedReviews !== null) {
      const response = getCurrentResponse(completedReviews, responseId);
      return dispatch(getCurrentResponseSuccess(response));
    } else {
      const successHandler = (data) => {
        const response = getCurrentResponse(data.completed_reviews, responseId);
        return dispatch(getCurrentResponseSuccess(response));
      };
      return dispatch(fetchCompletedReviews(successHandler));
    }
  };
}

export function getAcceptedAssignment(responseId) {
  const getCurrentAssignment = (completedReviews, _responseId) => {
    return completedReviews.filter(completedReview => completedReview.response)
      .find(completedReview => completedReview.response.id === _responseId);
  };

  return (dispatch, getState) => {
    const completedReviews = getState().teacherReviewsReducer.completedReviews;
    if (completedReviews !== null) {
      const assignment = getCurrentAssignment(completedReviews, responseId);
      return dispatch(getCurrentAssignmentSuccess(assignment));
    } else {
      const successHandler = (data) => {
        const assignment = getCurrentAssignment(data.completed_reviews, responseId);
        return dispatch(getCurrentAssignmentSuccess(assignment));
      };
      return dispatch(fetchCompletedReviews(successHandler));
    }
  };
}
