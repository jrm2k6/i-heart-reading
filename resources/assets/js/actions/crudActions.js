import request from 'superagent';
import { postRequest } from './apiActions';

export const CREATE_BOOK = 'CREATE_BOOK';
export const UPDATE_BOOK = 'UPDATE_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';

export const API_CREATE_BOOK = '/api/book';

const csrfToken = [].slice.call(document.getElementsByTagName('meta'))
    .filter((meta) => meta['name'] === 'csrf-token')[0]['content'];

const _headers = {
  'X-CSRF-TOKEN': csrfToken
};

export function createBook(dataBook) {
  return postRequest(API_CREATE_BOOK, dataBook, _headers);
}
