import { getRequest, postRequest } from './apiActions';

export const FETCH_ASSIGNMENTS_TO_REVIEW_SUCCESS = 'FETCH_ASSIGNMENTS_TO_REVIEW_SUCCESS';
export const FETCH_ASSIGNMENTS_TO_REVIEW_ERROR = 'FETCH_ASSIGNMENTS_TO_REVIEW_ERROR';
export const GET_CURRENT_RESPONSE_SUCCESS = 'GET_CURRENT_RESPONSE_SUCCESS';
export const GET_CURRENT_ASSIGNMENT_SUCCESS = 'GET_CURRENT_ASSIGNMENT_SUCCESS';
export const CREATE_REVIEW_SUCCESS = 'CREATE_REVIEW_SUCCESS';
export const CREATE_REVIEW_ERROR = 'CREATE_REVIEW_ERROR';

const URL_MY_REVIEWS = '/api/assignment-reviews/me';
const URL_REVIEWS = '/api/assignment-reviews';

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
  return {
    type: FETCH_ASSIGNMENTS_TO_REVIEW_ERROR,
    payload: err
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

export function fetchAssignmentsToReview() {
  return getRequest(URL_MY_REVIEWS, assignmentToReviewFetched, assignmentToReviewFetchedError);
}

export function getResponse(responseId) {
  return (dispatch, getState) => {
    const assignmentsToReview = getState().teacherReviewsReducer.assignmentsToReview;
    if (assignmentsToReview !== null) {
      const response = assignmentsToReview.map(assignmentToReview => assignmentToReview.response)
        .find(currentResponse => currentResponse.id === responseId);
      dispatch(getCurrentResponseSuccess(response));
    }
  }
}

export function getAssignment(responseId) {
  return (dispatch, getState) => {
    const assignmentsToReview = getState().teacherReviewsReducer.assignmentsToReview;
    if (assignmentsToReview !== null) {
      const assignment = assignmentsToReview.filter(assignmentToReview => assignmentToReview.response)
        .find(assignmentToReview => assignmentToReview.response.id === responseId);
      dispatch(getCurrentAssignmentSuccess(assignment));
    }
  }
}

function createReviewError() {
  return {
    type: CREATE_REVIEW_ERROR
  };
}

function createReviewSuccess() {
  return {
    type: CREATE_REVIEW_SUCCESS
  };
}

export function createReview(responseId, props) {
  return postRequest(URL_REVIEWS, props, createReviewSuccess, createReviewError, _headers);
}
