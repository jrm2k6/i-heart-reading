import {
  FETCH_USER_SUCCESS
} from '../actions/userProfileActions';

const initialState = {
  user: null
};

export default function userProfileReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return Object.assign({}, state, {
        user: action.payload.user
      });
    default:
      return state;
  }
}
