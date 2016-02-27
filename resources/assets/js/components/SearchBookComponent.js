import React, { Component } from 'react';
import { connect } from 'react-redux';
import { runSearch } from '../actions/searchActions';

export default class SearchBookComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
       <label>Type the title of your book</label>
       <input onChange={(e) => {this.props.onSearch(e.target.value);}}></input>
       <SearchBookSuggestions suggestions={this.props.suggestions} onClick={() => {console.log('item clicked');}}/>
     </div>
   );
  }
};

const SearchBookSuggestions = ({ suggestions, onClick }) => (
  <div>
    {suggestions.map((suggestion) => <div>{suggestion.title} - {suggestion.author}</div>)}
  </div>
);

const mapStateToProps = (state) => {
  return {
    suggestions: state.searchReducer.suggestions
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearch: (data) => {
      dispatch(runSearch(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBookComponent);
