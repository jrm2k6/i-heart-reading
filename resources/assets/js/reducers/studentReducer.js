import {
  FETCH_STUDENT_SUCCESS
} from '../actions/studentSearchActions';

import {
  SUCCESS_STATS_FETCHED,
  SUCCESS_UPDATES_FETCHED
} from '../actions/crudActions';

const initialState = {
  currentStudent: null,
  stats: [],
  updates: []
};

function updateCurrentStudent(currentStudent, action) {
  return Object.assign({}, currentStudent, {
    stats: action.payload.stats
  });
}

function updateCurrentStudentUpdates(currentStudent, action) {
  return Object.assign({}, currentStudent, {
    updates: action.payload.updates
  });
}

function updateStudentUpdates(stateUpdates, action) {
  const stats = stateUpdates.filter(studentStats =>
    Object.keys(studentStats)[0] !== action.payload.studentId);

  const newItem = {};
  newItem[action.payload.studentId] = action.payload.updates;
  return stats.concat(newItem);
}

function updateStats(stateStats, action) {
  const stats = stateStats.filter(studentStats =>
    Object.keys(studentStats)[0] !== action.payload.studentId);

  const newItem = {};
  newItem[action.payload.studentId] = action.payload.stats;
  return stats.concat(newItem);
}

export default function studentReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STUDENT_SUCCESS:
      return Object.assign({}, state, {
        currentStudent: action.payload.user
      });

    case SUCCESS_STATS_FETCHED:
      return Object.assign({}, state, {
        currentStudent: updateCurrentStudent(state.currentStudent, action),
        stats: updateStats(state.stats, action)
      });

    case SUCCESS_UPDATES_FETCHED:
      return Object.assign({}, state, {
        currentStudent: updateCurrentStudentUpdates(state.currentStudent, action),
        stats: updateStudentUpdates(state.updates, action)
      });

    default:
      return state;
  }
}
