import {
  ASSIGNED_BOOKS_FETCHED,
  ASSIGNMENT_CREATED,
  ASSIGNMENT_DELETED,
  ASSIGNMENT_PROGRESS_UPDATED,
  BOOKS_FETCHED,
  BOOK_CREATED,
  ERROR_ASSIGNED_BOOK_FETCHED,
  MARKED_BOOK_AS_READ
} from '../actions/crudActions';

const initialState = {
  books: [],
  assignedBooks: []
};

function updateAssignedBooks(id, assignedBooks) {
  return assignedBooks.filter((assignment) => assignment.id !== id);
}

function updateProgressBooks(_progress, assignedBooks) {
  const currentAssignment = assignedBooks.find(
    (assignment) => assignment.id === _progress.assignment_id);

  const updatedAssignment = Object.assign({}, currentAssignment, { progress: _progress });

  const filteredBooks = assignedBooks.filter(
    (assignment) => assignment.id !== _progress.assignment_id);

  return filteredBooks.concat(updatedAssignment);
}

export default function bookReducers(state = initialState, action) {
  let _assignedBooks;
  let _books;

  switch (action.type) {
    case ASSIGNED_BOOKS_FETCHED:
      return Object.assign({}, state, {
        assignedBooks: action.payload.books
      });

    case ASSIGNMENT_CREATED:
      return Object.assign({}, state, {
        assignedBooks: action.payload.books.concat(action.payload.books)
      });

    case ASSIGNMENT_DELETED:
      _assignedBooks = updateAssignedBooks(action.payload.id, state.assignedBooks);
      return Object.assign({}, state, { assignedBooks: _assignedBooks });

    case ASSIGNMENT_PROGRESS_UPDATED:
      _assignedBooks = updateProgressBooks(action.payload.progress, state.assignedBooks);
      return Object.assign({}, state, { assignedBooks: _assignedBooks });

    case MARKED_BOOK_AS_READ:
      _assignedBooks = updateProgressBooks(action.payload.progress, state.assignedBooks);
      return Object.assign({}, state, { assignedBooks: _assignedBooks });

    case BOOKS_FETCHED:
      return Object.assign({}, state, {
        books: action.payload.books
      });

    case BOOK_CREATED:
      _books = state.books.concat(action.payload.book);
      return Object.assign({}, state, {
        books: _books
      });

    case ERROR_ASSIGNED_BOOK_FETCHED:
      return Object.assign({}, state, {
        assignedBooks: []
      });

    default:
      return state;
  }
}
