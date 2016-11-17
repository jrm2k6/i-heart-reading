import * as apiActions from '../apiActions';
import { displaySuccessAlert, displayErrorAlert } from '../alertsActions';

const SIGNUP_SCHOOL_CONTACT_URL = '/api/school/contact';
const SIGNUP_VERIFY_CONTACT_URL = '/api/school/contact/verify';
const SIGNUP_VERIFY_PASSWORD_CURRENT_USER = '/api/me/password/verify';
const CREATE_CONTACT = 'CREATE_CONTACT';
export const CONTACT_CREATED = 'CONTACT_CREATED';
export const ERROR_CONTACT_CREATED = 'ERROR_CONTACT_CREATED';
const VERIFY_CONTACT = 'VERIFY_CONTACT';
export const CONTACT_VERIFIED = 'CONTACT_VERIFIED';
export const ERROR_CONTACT_VERIFIED = 'ERROR_CONTACT_VERIFIED';
const VERIFY_PASSWORD = 'VERIFY_PASSWORD';
export const PASSWORD_VERIFIED = 'PASSWORD_VERIFIED';
export const ERROR_PASSWORD_VERIFIED = 'ERROR_PASSWORD_VERIFIED';

const csrfToken = [].slice.call(document.getElementsByTagName('meta'))
    .filter((meta) => meta.name === 'csrf-token')[0].content;

const _headers = {
  'X-CSRF-TOKEN': csrfToken,
  'X-Requested-With': 'XMLHttpRequest'
};


export function createContact({ namePrimaryContact, emailAddressPrimaryContact, rolePrimaryContact, schoolId }) {
  return dispatch => {
    return apiActions.postRequest(SIGNUP_SCHOOL_CONTACT_URL,
      { name: namePrimaryContact, email_address: emailAddressPrimaryContact, role: rolePrimaryContact, school_id: schoolId },
      _headers).then(
        res => dispatch(contactCreated(res)),
        err => dispatch(errorContactCreated(err))
    );
  }
}

function contactCreated(data) {
  return {
    type: CONTACT_CREATED,
    data: data.primary_contact
  };
}

function errorContactCreated(data) {
  return {
    type: ERROR_CONTACT_CREATED,
    data: data.errors
  };
}

export function verifyContact() {
  return (dispatch, getState) => {
    const primaryContact = getState().signupReducer.currentPrimaryContact;
    return apiActions.getRequest(SIGNUP_VERIFY_CONTACT_URL,
      { email_address: primaryContact.email_address }).then(
        res => dispatch(contactVerified(res)),
        err => dispatch(errorContactVerified(err))
    );
  }
}

function contactVerified(data) {
  return {
    type: CONTACT_VERIFIED,
    data: data
  };
}

function errorContactVerified(data) {
  return {
    type: ERROR_CONTACT_CREATED,
    data: data.errors
  };
}

export function verifyPassword() {
  return (dispatch, getState) => {
    const primaryContact = getState().signupReducer.currentPrimaryContact;
    return apiActions.getRequest(SIGNUP_VERIFY_PASSWORD_CURRENT_USER,
      { password: password }).then(
        res => dispatch(passwordVerified(res)),
        err => dispatch(errorPasswordVerified(err))
    );
  }
}

function passwordVerified(data) {
  return {
    type: PASSWORD_VERIFIED,
    data: data
  };
}

function errorPasswordVerified(data) {
  return {
    type: ERROR_PASSWORD_VERIFIED,
    data: data.errors
  };
}
