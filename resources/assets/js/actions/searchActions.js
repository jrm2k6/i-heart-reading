import { getRequest } from './apiActions';

export const SEARCH = 'SEARCH';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';

const URL_SEARCH = '/api/books/search';

let t = null;

function runSearchSuccess(data) {
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

export function runSearch(_query) {
  return dispatch => {
    if (t !== null) {
      window.clearTimeout(t);
    }

    t = window.setTimeout(() => {
      dispatch(getRequest(URL_SEARCH, runSearchSuccess, runSearchError, { query: _query }));
    }, 2000);
  };
}
