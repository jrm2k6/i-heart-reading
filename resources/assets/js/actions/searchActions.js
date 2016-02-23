import request from 'superagent';
import { getRequest } from './apiActions';

export const SEARCH = 'SEARCH';

const URL_SEARCH = '/api/books/search';

export function runSearch(_query) {
  return getRequest(URL_SEARCH, runSearchSuccess, runSearchError, {query: _query});
}

function runSearchSuccess(data) {
  console.log(data);
}

function runSearchError(data) {
  console.log(data);
}
