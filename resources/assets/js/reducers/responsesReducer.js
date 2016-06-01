import {
  SUCCESS_SAVE_RESPONSE
} from '../actions/crudActions';

const initialState = {
  lasResponseSaved: null
};

export default function progressReducer(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_SAVE_RESPONSE:
      return Object.assign({}, state, {
        lasResponseSaved: action.payload.response_id
      });

    default:
      return state;
  }
}
