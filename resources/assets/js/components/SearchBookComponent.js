import React, { Component } from 'react';
import { connect } from 'react-redux';
import { runSearch } from '../actions/searchActions';
import { createAssignment } from '../actions/crudActions';

const SearchBookComponent = ({ onSearch, onClickAssign, suggestions, user }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <label>Type the title of your book</label>
    <input onChange={(e) => {onSearch(e.target.value);}}></input>
    <SearchBookSuggestions
      suggestions={suggestions}
      onClick={(bookId) => {onClickAssign(bookId, user.id);}}
    />
 </div>
);

const SearchBookSuggestions = ({ suggestions, onClick }) => (
  <div>
    {suggestions.map((suggestion) => (
        <div key={suggestion.id}>
          {suggestion.title} - {suggestion.author}
          <span
            style={{ padding: '0 10px' }}
            onClick={() => {onClick(suggestion.id);}}
          >
            Assign
          </span>
        </div>
      )
    )}
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
