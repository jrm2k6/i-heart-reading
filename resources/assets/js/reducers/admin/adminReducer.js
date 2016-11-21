import {
  CONTACT_CREATED,
  ERROR_CONTACT_CREATED,
  CONTACT_VERIFIED,
  ERROR_CONTACT_VERIFIED
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
  currentPrimaryContact: {name: 'Jeremy Dagorn', email_address: 'jeremy.dagorn@gmail.com', role: 'Dumb'},
  currentGroups: [],
  contactExists: false
};

export default function signupReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
