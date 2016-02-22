import request from 'superagent';
import { getRequest } from './apiActions';

export const SEARCH = 'SEARCH';

const URL_SEARCH = '/api/books/search';

export runSearch(_query) {
  return getRequest(URL_SEARCH, runSearchSuccess, runSearchError, {query: _query});
};

runSearchSuccess(data) {
  console.log(data);
};

runSearchError(data) {
  console.log(data);
}
