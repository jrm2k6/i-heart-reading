import {
  ASSIGNED_BOOKS_FETCHED,
  ASSIGNMENT_DELETED,
  BOOKS_FETCHED,
  BOOK_CREATED
} from '../actions/crudActions';

const initialState = {
  books: [],
  assignedBooks: []
};

function updateAssignedBooks(id, assignedBooks) {
  return assignedBooks.filter((assignment) => assignment.id !== id);
}

export default function bookReducers(state = initialState, action) {
  switch (action.type) {
    case ASSIGNED_BOOKS_FETCHED:
      return Object.assign({}, state, {
        assignedBooks: action.payload.books
      });
    case ASSIGNMENT_DELETED:
      let _assignedBooks = updateAssignedBooks(action.payload.id, state.assignedBooks);
      return Object.assign({}, state, { assignedBooks: _assignedBooks });
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
