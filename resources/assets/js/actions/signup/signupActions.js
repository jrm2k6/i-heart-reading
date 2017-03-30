import * as apiActions from '../apiActions';
import { displaySuccessAlert, displayErrorAlert } from '../alertsActions';

const SIGNUP_ACTIONS_URL = '/api/signup/finish'
export const SIGNUP_CONFIRMED = 'SIGNUP_CONFIRMED';
export const ERROR_SIGNUP_CONFIRMED = 'ERROR_SIGNUP_CONFIRMED';

const csrfToken = [].slice.call(document.getElementsByTagName('meta'))
    .filter((meta) => meta.name === 'csrf-token')[0].content;

const _headers = {
  'X-CSRF-TOKEN': csrfToken,
  'X-Requested-With': 'XMLHttpRequest'
};


export function confirmSignup() {
  return (dispatch, getState) => {
    const signupReducer = getState().signupReducer;
    const school = signupReducer.currentSchool;
    const schoolId = (school) ? school.id : null;

    return apiActions.postRequest(SIGNUP_ACTIONS_URL,
      { school_id: schoolId }, _headers).then(
        res => dispatch(schoolGroupCreated(res)),
        err => dispatch(errorSchoolGroup(err))
    );
  }
}

function signupConfirmed(data) {
  return {
    type: SIGNUP_CONFIRMED,
    data: data.group
  };
}

function errorSignupConfirmed(data) {
  return {
    type: ERROR_SIGNUP_CONFIRMED,
    data: data.response.body
  };
}
