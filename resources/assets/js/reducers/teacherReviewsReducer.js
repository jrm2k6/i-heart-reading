import {
  FETCH_ASSIGNMENTS_TO_REVIEW_SUCCESS
} from '../actions/teacherReviewsActions';

const initialState = {
  assignmentsToReview: null
};

export default function techerReviewsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ASSIGNMENTS_TO_REVIEW_SUCCESS:
      return Object.assign({}, state, {
        assignmentsToReview: action.payload
      });
    default:
      return state;
  }
}
