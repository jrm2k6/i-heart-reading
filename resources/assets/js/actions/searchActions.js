import request from 'superagent';
import { getRequest } from './apiActions';

export const SEARCH = 'SEARCH';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';

const URL_SEARCH = '/api/books/search';

let t = null;

export function runSearch(_query) {
  return (dispatch, getStore) => {
    if (t !== null) {
      window.clearTimeout(t);
    }

    t = window.setTimeout(() => {
      dispatch(getRequest(URL_SEARCH, runSearchSuccess, runSearchError, { query: _query }));
    }, 2000);
  };
}

function runSearchSuccess(data) {
  return {
    type: SEARCH_SUCCESS,
    payload: {
      suggestions: data.suggestions
    }
  };
}

function runSearchError(data) {
  return {
    type: SEARCH_ERROR,
    payload: {
      suggestions: []
    }
  };
}
