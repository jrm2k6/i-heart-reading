import {
  ASSIGNED_BOOKS_FETCHED,
  BOOKS_FETCHED,
  BOOK_CREATED
} from '../actions/crudActions';

const initialState = {
  books: [],
  assignedBooks: []
};

export default function bookReducers(state = initialState, action) {
  switch (action.type) {
    case ASSIGNED_BOOKS_FETCHED:
      return Object.assign({}, state, {
        assignedBooks: action.payload.books
      });
    case BOOKS_FETCHED:
      return Object.assign({}, state, {
        books: action.payload.books
      });
    case BOOK_CREATED:
      let _books = state.books.concat(action.payload.book);
      return Object.assign({}, state, {
        books: _books
      });
  }
  return state;
}
