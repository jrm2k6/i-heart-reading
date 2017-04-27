import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { runSearch } from '../../actions/searchActions';

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearch: (query) => {
    },

    onClickViewStudent: () => {},
  };
};

class SearchStudentComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQuery: null
    };
  }

  render() {
    const { onSearch } = this.props;
    return (
      <div className='search-student-container'>
        <div className='search-student-input-btn'>
          <input
            className='search-student-input'
            onChange={(e) => { this.setState({currentQuery: e.target.value}); }}
            placeholder='Enter a student name'
          >
          </input>
          <button className='search-books-btn'
            onClick={() => { onSearch(this.state.currentQuery); }}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
};

const SearchBookSuggestions = ({ suggestions, onClick, showModal }) => (
  <div className='search-book-suggestions-container'>
    <div className='search-book-suggestions-header'>
      <span className='book-properties'>Title</span>
      <span className='book-properties'>Author</span>
      <span className='book-properties'># Pages</span>
      <span className='book-properties'>Details</span>
      <span className='book-actions'></span>
    </div>
    <div>
    {suggestions.map(suggestion => {
      return (
        <div key={suggestion.google_book_id} className='search-book-suggestion'>
          <span className='book-properties'>{suggestion.title}</span>
          <span className='book-properties'>{suggestion.authors}</span>
          <span className='book-properties'>{suggestion.num_pages}</span>
          <span className='book-properties'
            onClick={() => { showModal(BookDetailsModal, {suggestion, onClick})}}
          >
            View more
          </span>
          <span
            className='book-actions assign'
            onClick={() => {onClick(suggestion.google_book_id);}}
          >
            Assign
          </span>
        </div>
      )}
    )}
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(SearchStudentComponent);
