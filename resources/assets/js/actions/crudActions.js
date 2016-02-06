export const CREATE_BOOK = 'CREATE_BOOK';
export const UPDATE_BOOK = 'UPDATE_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';

export function createBook(dataBook) {
  return {
    type: CREATE_BOOK,
    payload: dataBook
  };
}
