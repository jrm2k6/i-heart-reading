import {
  SHOW_ALERT,
  DISMISS_ALERT
} from '../actions/alertsActions.js';

const initialState = {
  currentTypeAlert: null,
  currentContentAlert: null
};

export default function progressReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_ALERT:
      return Object.assign({}, state, {
        currentTypeAlert: action.payload.typeAlert,
        currentContentAlert: action.payload.content
      });

    case DISMISS_ALERT:
      return Object.assign({}, state, {
        currentAlert: null
      });

    default:
      return state;
  }
}
