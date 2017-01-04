import {
  FETCH_ADMIN_USER_SUCCESS,
  FETCH_ADMIN_USER_ERROR
} from '../../actions/admin/adminProfileActions';

import {
  ADMINISTRATOR_DELETED,
  GROUP_TRANSFERRED
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

function updateGroups(currentGroups, _group) {
  return currentGroups.filter(group => group.id !== _group.id).concat(_group);
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

    case GROUP_TRANSFERRED:
      return Object.assign({}, initialState, {
        groups: updateGroups(state.groups, action.data.group)
      });

    default:
      return state;
  }
}
