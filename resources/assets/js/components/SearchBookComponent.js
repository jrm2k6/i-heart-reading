import React from 'react';
import { connect } from 'react-redux';
import { runSearch } from '../actions/searchActions';
import { createAssignment } from '../actions/crudActions';

const SearchBookComponent = ({ onSearch, onClickAssign, suggestions, user }) => (
  <div className='search-book-container'>
    <input
      className='search-book-input'
      onChange={(e) => {onSearch(e.target.value);}}
      placeholder='Enter a title or an author'
    >
    </input>
    <SearchBookSuggestions
      suggestions={suggestions}
      onClick={(bookId) => {onClickAssign(bookId, user.id);}}
    />
 </div>
);

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
