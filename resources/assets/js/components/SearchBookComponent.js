import React from 'react';
import { connect } from 'react-redux';
import { runSearch } from '../actions/searchActions';
import { createAssignment } from '../actions/crudActions';

const SearchBookComponent = ({ onSearch, onClickAssign, currentQuery,
    suggestions, noSuggestions, isSearching, user }) => {

  let results = null;
  if (currentQuery === null || currentQuery.length === 0) {
    results = <div>Please enter a query</div>;
  } else if (isSearching) {
    results = <div>Searching</div>;
  } else if (noSuggestions) {
    results = <div>No books found!</div>;
  } else {
    results = (
      <SearchBookSuggestions
        suggestions={suggestions}
        onClick={(bookId) => {
          onClickAssign(bookId, user.id);
        }}
      />
    );
  }
  return (
    <div className='search-book-container'>
      <input
        className='search-book-input'
        onChange={(e) => {onSearch(e.target.value);}}
        placeholder='Enter a title or an author'
      >
      </input>
      {results}
    </div>
  );
};

const SearchBookSuggestions = ({ suggestions, onClick }) => (
  <div className='search-book-suggestions-container'>
    <div className='search-book-suggestions-header'>
      <span className='book-properties'>Title</span>
      <span className='book-properties'>Author</span>
      <span className='book-properties'>Details</span>
      <span className='book-actions'></span>
    </div>
    <div>
    {suggestions.map((suggestion) => (
        <div key={suggestion.id} className='search-book-suggestion'>
          <span className='book-properties'>{suggestion.title}</span>
          <span className='book-properties'>{suggestion.author}</span>
          <span className='book-properties'>Details</span>
          <span
            className='book-actions assign'
            onClick={() => {onClick(suggestion.id);}}
          >
            Assign
          </span>
        </div>
      )
    )}
    </div>
  </div>
);

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
    onSearch: (data) => {
      dispatch(runSearch(data));
    },

    onClickAssign: (bookId, userId) => {
      dispatch(createAssignment(bookId, userId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBookComponent);
