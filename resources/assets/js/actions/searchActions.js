import { getRequest } from './apiActions';

export const SEARCH_STARTED = 'SEARCH_STARTED';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const SEARCH_SUCCESS_NO_SUGGESTIONS = 'SEARCH_SUCCESS_NO_SUGGESTIONS';

const URL_SEARCH = '/api/books/search';

let t = null;

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
    if (t !== null) {
      window.clearTimeout(t);
    }

    t = window.setTimeout(() => {
      dispatch(getRequest(URL_SEARCH, runSearchSuccess, runSearchError, { query: _query }));
    }, 2000);
  };
}
