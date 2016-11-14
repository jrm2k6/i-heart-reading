import * as apiActions from '../apiActions';
import { displaySuccessAlert, displayErrorAlert } from '../alertsActions';

const SIGNUP_SCHOOL_CONTACT_URL = '/api/school/contact'
const CREATE_CONTACT = 'CREATE_CONTACT';
export const CONTACT_CREATED = 'CONTACT_CREATED';
export const ERROR_CONTACT_CREATED = 'ERROR_CONTACTL_CREATED';

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
