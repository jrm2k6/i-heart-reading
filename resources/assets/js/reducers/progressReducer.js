import {
  SUCCESS_STATS_FETCHED
} from '../actions/crudActions';

const initialState = {
  stats: {}
};

export default function progressReducer(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_STATS_FETCHED:
      return Object.assign({}, state, {
        stats: action.payload.stats
      });

    default:
      return state;
  }
}
