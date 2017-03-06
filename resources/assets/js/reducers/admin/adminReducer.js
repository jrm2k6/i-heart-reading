import {
  FETCH_ADMIN_USER_SUCCESS,
  FETCH_ADMIN_USER_ERROR
} from '../../actions/admin/adminProfileActions';

import {
  ADMINISTRATOR_DELETED,
  GROUP_TRANSFERRED,
  FETCH_ALL_STUDENTS_GROUP_EXCEPT_FETCHED,
  STUDENTS_GROUP_FETCHED,
  STUDENTS_TRANSFERRED,
  TEACHER_CREATED,
  TEACHER_DELETED,
  GROUP_CREATED,
  GROUP_DELETED
} from '../../actions/admin/adminDashboardActions';

const initialState = {
  adminUser: null,
  school: null,
  teachers: [],
  admins: [],
  groups: [{id: 0}],
  users: {}
};

function updateAdmins(currentAdmins, idAdminDeleted) {
  return currentAdmins.filter(admin => admin.id !== idAdminDeleted);
}

function updateTeachers(currentTeachers, idTeacherDeleted) {
  return currentTeachers.filter(teacher => teacher.id !== idTeacherDeleted);
}

function updateGroups(currentGroups, _group) {
  return currentGroups.filter(group => group.id !== _group.id).concat(_group);
}

function addGroup(currentGroups, _group) {
  return currentGroups.concat(_group);
}

function updateGroupsAfterDeletion(currentGroups, groupId) {
  return currentGroups.filter(group => group.id !== groupId);
}

function updateGroupsStudents(groups, groupWithStudents) {
  const updatedGroups = groups.map(group => {
    const studentsForGroup = groupWithStudents.find(groupWithStudent => groupWithStudent.id === group.id);
    if (studentsForGroup) {
      group.students = studentsForGroup.students;
    }

    group.students = (group.students) ? group.students : [];
  });

  return groups;
}

function updateGroupsAfterTransfer(groups, updatedData) {
  const { group, students } = updatedData;
  const studentsToRemoveFromOtherGroups = students.map(student => student.user_id);

  const groupsWithRemovedStudents = groups.map(currentGroup => {
    const updatedStudents = currentGroup.students.filter(student => studentsToRemoveFromOtherGroups.filter(
      id => id === student.id)
    .length === 0);
    return Object.assign({}, currentGroup, {students: updatedStudents});
  });

  const groupsWithNewlyUpdateGroupRemoved = groupsWithRemovedStudents.filter(currentGroup => currentGroup.id !== group.id).concat(group);

  return groupsWithNewlyUpdateGroupRemoved;
}

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ADMIN_USER_SUCCESS:
      const { admin, groups, teachers, school, admins } = action.payload;
      const newGroups = state.groups.concat(groups);
      return Object.assign({}, state, { adminUser: admin, groups: newGroups, teachers, school, admins });

    case ADMINISTRATOR_DELETED:
      // fix consistency
      return Object.assign({}, state, {
        admins: updateAdmins(state.admins, action.data.idAdminDeleted)
      });

    case TEACHER_DELETED:
      // fix consistency
      return Object.assign({}, state, {
        teachers: updateTeachers(state.teachers, action.data.idTeacherDeleted)
      });

    case TEACHER_CREATED:
      // fix consistency
      return Object.assign({}, state, {
        teachers: state.teachers.concat(action.data.teacher)
      });

    case GROUP_DELETED:
      // fix consistency
      return Object.assign({}, state, {
        groups: updateGroupsAfterDeletion(state.groups, action.data.idGroupDeleted)
      });

    case GROUP_CREATED:
      // fix consistency
      return Object.assign({}, state, {
        groups: addGroup(state.groups, action.data.group)
      });

    case GROUP_TRANSFERRED:
      return Object.assign({}, state, {
        groups: updateGroups(state.groups, action.data.group)
      });

    case FETCH_ALL_STUDENTS_GROUP_EXCEPT_FETCHED:
    case STUDENTS_GROUP_FETCHED:
      return Object.assign({}, state, {
        groups: updateGroupsStudents(state.groups, action.data)
      });

    case STUDENTS_TRANSFERRED:
      return Object.assign({}, state, {
        groups: updateGroupsAfterTransfer(state.groups, action.data)
      });

    default:
      return state;
  }
}
