import {
  SHOW_ALERT,
  DISMISS_ALERT
} from '../actions/alertsActions.js';

const initialState = {
  currentAlert: null
};

export default function progressReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_ALERT:
      return Object.assign({}, state, {
        currentAlert: action.payload.alert
      });

    case DISMISS_ALERT:
      return Object.assign({}, state, {
        currentAlert: null
      });

    default:
      return state;
  }
}
