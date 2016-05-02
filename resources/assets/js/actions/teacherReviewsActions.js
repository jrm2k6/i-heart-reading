import { getRequest } from './apiActions';

export const FETCH_ASSIGNMENTS_TO_REVIEW_SUCCESS = 'FETCH_ASSIGNMENTS_TO_REVIEW_SUCCESS';
export const FETCH_ASSIGNMENTS_TO_REVIEW_ERROR = 'FETCH_ASSIGNMENTS_TO_REVIEW_ERROR';
export const GET_CURRENT_RESPONSE_SUCCESS = 'GET_CURRENT_RESPONSE_SUCCESS';

const URL_REVIEWS = '/api/assignment-reviews/me';

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


export function fetchAssignmentsToReview() {
  return getRequest(URL_REVIEWS, assignmentToReviewFetched, assignmentToReviewFetchedError);
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
