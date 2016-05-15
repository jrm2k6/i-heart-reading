import React from 'react';
import { connect } from 'react-redux';
import { createBook, fetchBooks, fetchAssignedBooks } from '../actions/crudActions';

class BookComponent extends React.Component {
  componentWillMount() {
    this.props.fetchBooks();
    this.props.fetchAssignedBooks();
  }

  render() {
    return (
        <div>
          {React.cloneElement(this.props.children, {
            books: this.props.books,
            assignedBooks: this.props.assignedBooks,
            onAddBook: this.props.onAddBook
          })}
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.bookReducers.books,
    assignedBooks: state.bookReducers.assignedBooks
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddBook: (data) => {
      dispatch(createBook(data));
    },

    fetchBooks: () => {
      dispatch(fetchBooks());
    },

    fetchAssignedBooks: () => {
      dispatch(fetchAssignedBooks());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookComponent);
