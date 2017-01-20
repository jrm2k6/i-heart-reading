import {
  CONTACT_CREATED,
  CONTACT_UPDATED,
  ERROR_CONTACT_CREATED,
  CONTACT_VERIFIED,
  ERROR_CONTACT_VERIFIED
} from '../../actions/signup/signupContactActions';

import {
  SCHOOL_CREATED,
  SCHOOL_UPDATED,
  ERROR_SCHOOL_CREATED
} from '../../actions/signup/signupSchoolActions';

import {
  GROUP_CREATED,
  ERROR_GROUP_CREATED
} from '../../actions/signup/signupSchoolGroupAction';

const initialState = {
  currentSchool: null,
  currentPrimaryContact: null,
  currentGroups: [],
  contactExists: false
};

export default function signupReducer(state = initialState, action) {
  switch (action.type) {
    case CONTACT_CREATED:
    case CONTACT_UPDATED:
      return Object.assign({}, state, {
        currentPrimaryContact: action.data
      });

    case ERROR_CONTACT_CREATED:
      return Object.assign({}, state, {
      });

    case SCHOOL_CREATED:
    case SCHOOL_UPDATED:
      return Object.assign({}, state, {
        currentSchool: action.data
      });

    case ERROR_SCHOOL_CREATED:
      return Object.assign({}, state, {
      });

    case GROUP_CREATED:
      let updatedGroups = state.currentGroups.concat(action.data);
      return Object.assign({}, state, {
        currentGroups: updatedGroups
      });

    case ERROR_GROUP_CREATED:
      return Object.assign({}, state, {
      });

    case CONTACT_VERIFIED:
      return Object.assign({}, state, {
        contactExists: action.data.exists
      })

    default:
      return state;
  }
}
