import {
  FETCH_STUDENT_SUCCESS
} from '../actions/studentSearchActions';

const initialState = {
  currentStudent: null
};

export default function studentReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STUDENT_SUCCESS:
      return Object.assign({}, state, {
        currentStudent: action.payload.user
      });

    default:
      return state;
  }
}
