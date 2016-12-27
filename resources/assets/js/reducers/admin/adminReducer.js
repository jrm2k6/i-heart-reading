import {
  FETCH_ADMIN_USER_SUCCESS,
  FETCH_ADMIN_USER_ERROR
} from '../../actions/admin/adminProfileActions';

import {
  ADMINISTRATOR_DELETED,
} from '../../actions/admin/adminDashboardActions';

const initialState = {
  adminUser: null,
  school: null,
  teachers: [],
  admins: [],
  groups: [],
  users: []
};

function updateAdmins(currentAdmins, idAdminDeleted) {
  return currentAdmins.filter(admin => admin.id !== idAdminDeleted);
}

export default function signupReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ADMIN_USER_SUCCESS:
      const { admin, groups, teachers, school, admins } = action.payload;
      return Object.assign({}, initialState, { adminUser: admin, groups, teachers, school, admins });

    case ADMINISTRATOR_DELETED:
      // fix consistency
      return Object.assign({}, initialState, {
        admins: updateAdmins(state.admins, action.data.idAdminDeleted)
      });

    default:
      return state;
  }
}
