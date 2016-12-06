import {
  FETCH_ADMIN_USER_SUCCESS,
  FETCH_ADMIN_USER_ERROR
} from '../../actions/admin/adminProfileActions';

const initialState = {
  adminUser: null,
  schools: [],
  teachers: [],
  groups: []
};

export default function signupReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ADMIN_USER_SUCCESS:
      console.log(action);
      const { admin, groups, teachers, schools } = action.payload;
      return Object.assign({}, initialState, { adminUser: admin, groups, teachers, schools });
    default:
      return state;
  }
}
