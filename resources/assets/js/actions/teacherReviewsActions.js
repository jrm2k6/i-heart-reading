import { getRequest } from './apiActions';

export const FETCH_ASSIGNMENTS_TO_REVIEW_SUCCESS = 'FETCH_ASSIGNMENTS_TO_REVIEW_SUCCESS';
export const FETCH_ASSIGNMENTS_TO_REVIEW_ERROR = 'FETCH_ASSIGNMENTS_TO_REVIEW_ERROR';

const URL_REVIEWS = '/api/assignment-reviews/me';

export function assignmentToReviewFetched(data) {
  return {
    type: FETCH_ASSIGNMENTS_TO_REVIEW_SUCCESS,
    payload: data.assignment_reviews
  };
}

export function assignmentToReviewFetchedError(err) {
  return {
    type: FETCH_ASSIGNMENTS_TO_REVIEW_ERROR,
    payload: err
  };
}

export function fetchAssignmentsToReview() {
  return getRequest(URL_REVIEWS, assignmentToReviewFetched, assignmentToReviewFetchedError);
}
