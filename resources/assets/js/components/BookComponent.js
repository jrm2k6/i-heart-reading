import React from 'react';
import { connect } from 'react-redux';
import { createBook, fetchBooks } from '../actions/crudActions';

class BookComponent extends React.Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    return (
        <div>
          {React.cloneElement(this.props.children, {
            books: this.props.books,
            onAddBook: this.props.onAddBook
          })}
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.bookReducers.books
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddBook: (data) => {
      dispatch(createBook(data));
    },

    fetchBooks: () => {
      dispatch(fetchBooks());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookComponent);
