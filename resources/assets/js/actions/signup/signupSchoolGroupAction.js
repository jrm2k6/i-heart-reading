import * as apiActions from '../apiActions';
import { displaySuccessAlert, displayErrorAlert } from '../alertsActions';

const SIGNUP_SCHOOL_GROUP_URL = '/api/school/group'
const CREATE_GROUP = 'CREATE_GROUP';
export const GROUP_CREATED = 'GROUP_CREATED';
export const ERROR_GROUP_CREATED = 'ERROR_GROUP_CREATED';

const csrfToken = [].slice.call(document.getElementsByTagName('meta'))
    .filter((meta) => meta.name === 'csrf-token')[0].content;

const _headers = {
  'X-CSRF-TOKEN': csrfToken,
  'X-Requested-With': 'XMLHttpRequest'
};


export function createGroup({ name, grade, nickname, schoolId }) {
  return dispatch => {
    return apiActions.postRequest(SIGNUP_SCHOOL_GROUP_URL,
      { name, grade, nickname, school_id: schoolId }, _headers).then(
        res => dispatch(schoolGroupCreated(res)),
        err => dispatch(errorSchoolGroup(err))
    );
  }
}

function schoolGroupCreated(data) {
  return {
    type: GROUP_CREATED,
    data: data.group
  };
}

function errorSchoolGroup(data) {
  return {
    type: ERROR_GROUP_CREATED,
    data: data.response.body
  };
}
