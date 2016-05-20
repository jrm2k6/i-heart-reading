import {
  FETCH_ASSIGNMENTS_TO_REVIEW_SUCCESS,
  FETCH_STUDENT_UPDATES_SUCCESS,
  GET_CURRENT_ASSIGNMENT_SUCCESS,
  GET_CURRENT_RESPONSE_SUCCESS
} from '../actions/teacherReviewsActions';

const initialState = {
  assignmentsToReview: null,
  updates: null,
  currentResponse: null,
  currentAssignment: null
};

export default function techerReviewsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ASSIGNMENTS_TO_REVIEW_SUCCESS:
      return Object.assign({}, state, {
        assignmentsToReview: action.payload
      });
    case FETCH_STUDENT_UPDATES_SUCCESS:
      return Object.assign({}, state, {
        updates: action.payload
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
