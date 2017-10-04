import {
  FETCH_STUDENT_UPDATES,
  FETCH_STUDENT_UPDATES_SUCCESS,
  FETCH_STUDENT_UPDATES_ERROR
} from '../actions/teacherReviewsActions';

const initialState = {
  showingStudentsUpdateLoader: false
};

export default function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STUDENT_UPDATES:
      return Object.assign({}, state, {
        showingStudentsUpdateLoader: true
      });

    case FETCH_STUDENT_UPDATES_SUCCESS:
    case FETCH_STUDENT_UPDATES_ERROR:
      return Object.assign({}, state, {
        showingStudentsUpdateLoader: false
      });

    default:
      return state;
  }
}
