import request from 'superagent';
import { postRequest, getRequest } from './apiActions';

export const FETCH_BOOKS = 'FETCH_BOOKS';
export const BOOKS_FETCHED = 'BOOKS_FETCHED';
export const ERROR_BOOKS_FETCHED = 'ERROR_BOOKS_FETCHED';
export const CREATE_BOOK = 'CREATE_BOOK';
export const BOOK_CREATED = 'BOOK_CREATED';
export const ERROR_BOOK_CREATED = 'ERROR_BOOK_CREATED';
export const UPDATE_BOOK = 'UPDATE_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';

export const API_BOOKS_RESOURCE_URL = '/api/books';

const csrfToken = [].slice.call(document.getElementsByTagName('meta'))
    .filter((meta) => meta['name'] === 'csrf-token')[0]['content'];

const _headers = {
  'X-CSRF-TOKEN': csrfToken
};

export function fetchBooks() {
  return getRequest(API_BOOKS_RESOURCE_URL, booksFetched, errorBooksFetched);
};

export function createBook(dataBook) {
  return postRequest(API_BOOKS_RESOURCE_URL, dataBook, _headers, bookCreated, errorBookCreated);
};

export function bookCreated(data) {
  return {
    type: BOOK_CREATED,
    payload: {
      book: data
    }
  };
};

export function errorBookCreated() {
  return {
    type: ERROR_BOOK_CREATED
  };
};

export function booksFetched(data) {
  return {
    type: BOOKS_FETCHED,
    payload: data
  }
};

export function errorBooksFetched() {
  return {
    type: ERROR_BOOKS_FETCHED
  }
}
