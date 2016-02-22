import React from 'react';
import { connect } from 'react-redux';
import LateralMenu from './LateralMenu';
import { createBook } from '../actions/crudActions';

class BookComponent extends React.Component {
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddBook: (data) => {
      dispatch(createBook(data));
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(BookComponent);