import {
  SEARCH_SUCCESS
} from '../actions/searchActions';

const initialState = {
  suggestions: []
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return Object.assign({}, state, {
        suggestions: action.payload.suggestions
      });
    default:
      return state;
  }
}
