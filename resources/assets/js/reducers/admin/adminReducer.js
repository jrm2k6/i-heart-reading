import {
  FETCH_ADMIN_USER_SUCCESS,
  FETCH_ADMIN_USER_ERROR
} from '../../actions/admin/adminProfileActions';

const initialState = {
  adminUser: null,
  school: null,
  teachers: [],
  admins: [],
  groups: []
};

export default function signupReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ADMIN_USER_SUCCESS:
      const { admin, groups, teachers, school, admins } = action.payload;
      return Object.assign({}, initialState, { adminUser: admin, groups, teachers, school, admins });
    default:
      return state;
  }
}
