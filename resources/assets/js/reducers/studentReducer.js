import {
  FETCH_STUDENT_SUCCESS
} from '../actions/studentSearchActions';

import {
  SUCCESS_STATS_FETCHED,
  SUCCESS_UPDATES_FETCHED
} from '../actions/crudActions';

const initialState = {
  currentStudent: null,
  stats: {},
  updates: {}
};

function updateStudentUpdates(stateUpdates, action) {
  const keysToKeep = Object.keys(stateUpdates).
    filter(key => key !== action.payload.studentId);
  const updatesToKeep = keysToKeep.map(key => {
    const res = {};
    res[key] = stateUpdates[key];
    return res;
  });

  const newItem = {};
  const responsesUpdates = action.payload.updates
    .filter(update => update.assignment.response !== null)
    .map(update => update.assignment.response);
  const uniqueResponsesUpdates = responsesUpdates.reduce((acc, current) => {
    if (acc.find(elem => elem.id === current.id) === undefined) {
      const _acc = acc.concat(current);
      return _acc;
    }
    return acc;
  }, []);

  newItem[action.payload.studentId] = action.payload.updates.concat(uniqueResponsesUpdates);
  return Object.assign({}, updatesToKeep, newItem);
}

function updateStats(stateStats, action) {
  const keysToKeep = Object.keys(stateStats).filter(key => key !== action.payload.studentId);
  const statsToKeep = keysToKeep.map(key => {
    const res = {};
    res[key] = stateStats[key];
    return res;
  });

  const newItem = {};
  newItem[action.payload.studentId] = action.payload.stats;
  const res = Object.assign({}, statsToKeep, newItem);

  return res;
}

export default function studentReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STUDENT_SUCCESS:
      return Object.assign({}, state, {
        currentStudent: action.payload.user
      });

    case SUCCESS_STATS_FETCHED:
      return Object.assign({}, state, {
        stats: updateStats(state.stats, action)
      });

    case SUCCESS_UPDATES_FETCHED:
      return Object.assign({}, state, {
        updates: updateStudentUpdates(state.updates, action),
      });

    default:
      return state;
  }
}
