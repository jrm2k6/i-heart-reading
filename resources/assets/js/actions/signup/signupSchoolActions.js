import * as apiActions from '../apiActions';
import { displaySuccessAlert, displayErrorAlert } from '../alertsActions';

const SIGNUP_SCHOOL_URL = '/api/school'
const CREATE_SCHOOL = 'CREATE_SCHOOL';
export const SCHOOL_CREATED = 'SCHOOL_CREATED';
export const SCHOOL_UPDATED = 'SCHOOL_UPDATED';
export const ERROR_SCHOOL_CREATED = 'ERROR_SCHOOL_CREATED';
export const ERROR_SCHOOL_UPDATED = 'ERROR_SCHOOL_UPDATED';


const csrfToken = [].slice.call(document.getElementsByTagName('meta'))
    .filter((meta) => meta.name === 'csrf-token')[0].content;

const _headers = {
  'X-CSRF-TOKEN': csrfToken,
  'X-Requested-With': 'XMLHttpRequest'
};


export function createSchool({ nameSchool, addressSchool, domainNameSchool }) {
  return dispatch => {
    return apiActions.postRequest(SIGNUP_SCHOOL_URL,
      { name: nameSchool, address: addressSchool, domain_name: domainNameSchool },
      _headers).then(
        res => dispatch(schoolCreated(res)),
        err => dispatch(errorSchoolCreated(err))
    );
  }
}

export function updateSchool({ nameSchool, addressSchool, domainNameSchool, id }) {
  return dispatch => {
    return apiActions.putRequest(`${SIGNUP_SCHOOL_URL}/${id}`,
      { name: nameSchool, address: addressSchool, domain_name: domainNameSchool },
      _headers).then(
        res => dispatch(schoolUpdated(res)),
        err => dispatch(errorSchoolCreated(err))
    );
  }
}


function schoolCreated(data) {
  return {
    type: SCHOOL_CREATED,
    data: data.school
  };
}

function schoolUpdated(data) {
  return {
    type: SCHOOL_UPDATED,
    data: data.school
  };
}

function errorSchoolCreated(data) {
  return {
    type: ERROR_SCHOOL_CREATED,
    data: data.errors
  };
}

function errorSchoolUpdated(data) {
  return {
    type: ERROR_SCHOOL_UPDATED,
    data: data.errors
  };
}
