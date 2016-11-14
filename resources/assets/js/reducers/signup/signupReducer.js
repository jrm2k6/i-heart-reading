import {
  CONTACT_CREATED,
  ERROR_CONTACT_CREATED
} from '../../actions/signup/signupContactActions';

import {
  SCHOOL_CREATED,
  ERROR_SCHOOL_CREATED
} from '../../actions/signup/signupSchoolActions';

import {
  GROUP_CREATED,
  ERROR_GROUP_CREATED
} from '../../actions/signup/signupSchoolGroupAction';

const initialState = {
  currentSchool: null,
  currentPrimaryContact: null,
  currentGroups: []
};

export default function signupReducer(state = initialState, action) {
  switch (action.type) {
    case CONTACT_CREATED:
      return Object.assign({}, state, {
        currentPrimaryContact: action.data
      });

    case ERROR_CONTACT_CREATED:
      return Object.assign({}, state, {
      });

    case SCHOOL_CREATED:
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

    default:
      return state;
  }
}
