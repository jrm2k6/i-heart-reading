import { FETCH_USER_SUCCESS } from '../actions/userProfileActions';
import { SUCCESS_UPDATES_FETCHED } from '../actions/crudActions';

const initialState = {
  user: null,
  updates: null
};

export default function userProfileReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return Object.assign({}, state, {
        user: action.payload
      });

    case SUCCESS_UPDATES_FETCHED:
      return Object.assign({}, state, {
        updates: action.payload
      });
    default:
      return state;
  }
}
