import {
  SEARCH_SUCCESS,
  SEARCH_STARTED,
  SEARCH_SUCCESS_NO_SUGGESTIONS
} from '../actions/searchActions';

const initialState = {
  currentQuery: null,
  suggestions: [],
  noSuggestions: false,
  isSearching: false
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_STARTED:
      return Object.assign({}, state, {
        currentQuery: action.payload,
        isSearching: true
      });

    case SEARCH_SUCCESS:
      return Object.assign({}, state, {
        suggestions: action.payload.suggestions,
        noSuggestions: false,
        isSearching: false
      });

    case SEARCH_SUCCESS_NO_SUGGESTIONS:
      return Object.assign({}, state, {
        suggestions: [],
        noSuggestions: true,
        isSearching: false
      });

    default:
      return state;
  }
}
