import { getRequest } from './apiActions';

export const SEARCH_STARTED = 'SEARCH_STARTED';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const SEARCH_SUCCESS_NO_SUGGESTIONS = 'SEARCH_SUCCESS_NO_SUGGESTIONS';

const URL_SEARCH = '/api/books/search';

function runSearchSuccess(data) {
  if (data.suggestions.length === 0) {
    return {
      type: SEARCH_SUCCESS_NO_SUGGESTIONS
    };
  }

  return {
    type: SEARCH_SUCCESS,
    payload: {
      suggestions: data.suggestions
    }
  };
}

function runSearchError() {
  return {
    type: SEARCH_ERROR,
    payload: {
      suggestions: []
    }
  };
}

function startSearch(_query) {
  return {
    type: SEARCH_STARTED,
    payload: _query
  };
}

export function runSearch(_query) {
  return dispatch => {
    dispatch(startSearch(_query));
    return getRequest(URL_SEARCH, { query: _query }).then(
      res => { dispatch(runSearchSuccess(res)); },
      err => { dispatch(runSearchError(err)); }
    );
  };
}
