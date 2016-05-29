import React from 'react';
import { browserHistory } from 'react-router';
import SearchBookComponent from './SearchBookComponent';

export default class AddBookComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddBook: false,
      bookTitle: null,
      bookAuthor: null,
      bookNumPages: null
    };
  }

  getAddBookForm() {
    return (
      <div className='add-book-form-container'>
        <form onSubmit={(e) => {this.handleSubmit(e);}}>
          <input
            className='form-input'
            placeholder='Book Title'
            onChange={(e) => { this.setState({ bookTitle: e.target.value.trim() });}}
          />
          <input
            className='form-input'
            placeholder='Book Author'
            onChange={(e) => { this.setState({ bookAuthor: e.target.value.trim() });}}
          />
          <input
            className='form-input'
            placeholder='Number of pages'
            onChange={(e) => { this.setState({ bookNumPages: e.target.value.trim() });}}
          />
          <button
            className='add-book-submit-button'
            type='submit'
            disabled={!this.validate()}
          >
          Create and Assign
          </button>
        </form>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.validate()) {
      const data = {
        book_title: this.state.bookTitle,
        book_author_name: this.state.bookAuthor,
        book_nb_pages: this.state.bookNumPages
      };

      this.props.onAddBook(data);
      browserHistory.push('/app/books');
    }
  }

  render() {
    let addBookForm = (this.state.showAddBook) ?
      this.getAddBookForm() : null;

    return (
      <div>
        <SearchBookComponent />
        <button className='add-new-book-btn'
          onClick={() => {this.setState({ showAddBook: true });}}
          >
          Add New Book
        </button>
        {addBookForm}
      </div>
    );
  }

  validate() {
    const isValidTitle = this.state.bookTitle && this.state.bookTitle.trim().length > 0;
    const isValidAuthor = this.state.bookAuthor && this.state.bookAuthor.trim().length > 0;
    const isValidNumPages = this.state.bookNumPages
      && this.state.bookNumPages.trim().length > 0
      && !isNaN(parseInt(this.state.bookNumPages, 10));

    return isValidTitle && isValidAuthor && isValidNumPages;
  }
}
