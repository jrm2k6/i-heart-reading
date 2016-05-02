import {
  FETCH_ASSIGNMENTS_TO_REVIEW_SUCCESS,
  GET_CURRENT_ASSIGNMENT_SUCCESS,
  GET_CURRENT_RESPONSE_SUCCESS
} from '../actions/teacherReviewsActions';

const initialState = {
  assignmentsToReview: null,
  currentResponse: null,
  currentAssignment: null
};

export default function techerReviewsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ASSIGNMENTS_TO_REVIEW_SUCCESS:
      return Object.assign({}, state, {
        assignmentsToReview: action.payload
      });
    case GET_CURRENT_RESPONSE_SUCCESS:
      return Object.assign({}, state, {
        currentResponse: action.payload
      });
    case GET_CURRENT_ASSIGNMENT_SUCCESS:
      return Object.assign({}, state, {
        currentAssignment: action.payload
      });
    default:
      return state;
  }
}
