import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { searchStudent } from '../../actions/studentSearchActions';

const mapStateToProps = (state) => {
  return {
    suggestions: state.studentReducer.suggestions
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearch: (query) => dispatch(searchStudent(query)),
  };
};

class SearchStudentComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQuery: null,
      showSuggestions: true,
      showValidationError: false,
      validationError: null
    };
  }

  render() {
    const { onSearch, suggestions } = this.props;
    const { showValidationError, validationError } = this.state;

    return (
      <div className='search-student-container'>
        <div className='search-student-input-container'>
          <div className='search-student-input-btn'>
            <input
              className='search-student-input'
              onChange={(e) => { this.setState({currentQuery: e.target.value}); }}
              placeholder='Enter a student name'
            >
            </input>
            <button className='search-books-btn'
              onClick={() => {
                const currentQuery = this.state.currentQuery;
                if (currentQuery && currentQuery.trim().length > 0) {
                  onSearch(this.state.currentQuery).then(
                    () => { this.setState({ showSuggestions: true, validationError: null }); },
                    () => { this.setState({ showSuggestions: true, validationError: 'Oops, an error occurred!' }); }
                  );
                } else {
                  this.setState({ validationError: 'Your query cannot be empty!' });
                }
              }}
            >
              Search
            </button>
          </div>
          <div className='search-student-error'>{this.state.validationError}</div>
        </div>
        {this.renderSuggestions()}
      </div>
    );
  }

  renderSuggestions() {
    const { suggestions } = this.props;
    if (suggestions.length > 0 && this.state.showSuggestions) {
      return (
        <div className='search-student-suggestions'>
          <div className='search-student-suggestions-header'>
            <i className='material-icons close-suggestions'
              onClick={() => { this.setState({ showSuggestions: false }); }}
            >
              close
            </i>
          </div>
          {suggestions.map((suggestion) => {
            return (
              <div onClick={() => {
                window.location = `/app/student/${suggestion.id}`;
              }}
                key={suggestion.id}
                className='search-student-suggestion-item'
              >
                {suggestion.name}
              </div>
            );
          })}
        </div>
      );
    }

    return null;
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchStudentComponent);
