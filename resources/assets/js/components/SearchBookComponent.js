import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { runSearch } from '../actions/searchActions';
import { createAssignment } from '../actions/crudActions';
import { showModal } from '../actions/modals/modalActions';
import BookDetailsModal from './modals/BookDetailsModal';

const mapStateToProps = (state) => {
  return {
    suggestions: state.searchReducer.suggestions,
    noSuggestions: state.searchReducer.noSuggestions,
    isSearching: state.searchReducer.isSearching,
    currentQuery: state.searchReducer.currentQuery,
    user: state.userProfileReducer.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearch: (query, type) => {
      dispatch(runSearch(query, type));
    },

    onClickAssign: (bookId, userId) => dispatch(createAssignment(bookId, userId)),

    showModal: (component, data) => {
      dispatch(showModal(component, data));
    },
  };
};

class SearchBookComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQuery: null,
      selectedOption: 'title'
    };
  }

  render() {
    const { onSearch, onClickAssign, currentQuery,
     suggestions, noSuggestions, isSearching, user } = this.props

    let results = null;

    if (currentQuery === null || currentQuery.length === 0) {
      results = <div className='search-hint'>Please enter a query</div>;
    } else if (isSearching) {
      results = <div className='search-hint'>Searching</div>;
    } else if (noSuggestions) {
      results = <div className='search-hint'>No books found!</div>;
    } else {
      results = (
        <SearchBookSuggestions
          suggestions={suggestions}
          showModal={(component, data) => { this.props.showModal(component, data); }}
          onClick={(bookId) => {
            onClickAssign(bookId, user.id).finally(
              function() {
                browserHistory.push('/app/books');
              }
            );
          }}
        />
      );
    }

    return (
      <div className='search-book-container'>
        <div className='search-book-input-btn'>
          <input
            className='search-book-input'
            onChange={(e) => { this.setState({currentQuery: e.target.value}); }}
            placeholder='Enter a title or an author'
          >
          </input>
          <button className='search-books-btn'
            onClick={() => { onSearch(this.state.currentQuery, this.state.selectedOption); }}
          >
            Search
          </button>
        </div>
        <div className='search-input-options right-margin'>
          <span className='search-option-title'>Select a filter:</span>
          <div className='ihr-radio-wrapper'
            onClick={() => { this.setState({ selectedOption: 'author' }); }}
          >
            <input className='ihr-radio'
              type='radio'
              name='author'
              id='author'
              value='author'
              readOnly={true}
              checked={'author' == this.state.selectedOption}
              onClick={() => { this.setState({ selectedOption: 'author' }); }}
            />
            <div className='ihr-check'></div>
            <label className='label-ihr'  forName='author'>
              Book Authors
            </label>
          </div>
          <div className='ihr-radio-wrapper'
            onClick={() => { this.setState({ selectedOption: 'title' }); }}
          >
            <input className='ihr-radio'
              type='radio'
              name='title'
              id='title'
              value='title'
              checked={'title' == this.state.selectedOption}
              readOnly={true}
              onClick={() => { this.setState({ selectedOption: 'title' }); }}
            />
            <div className='ihr-check'></div>
            <label className='label-ihr' forName='title'>
              Book Titles
            </label>
          </div>
        </div>
        {results}
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchBookComponent);
