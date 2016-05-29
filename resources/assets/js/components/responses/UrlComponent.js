import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  fetchAssignedBooks,
  saveResponse
} from '../../actions/crudActions';

const mapStateToProps = (state) => {
  return {
    assignedBooks: state.bookReducers.assignedBooks
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchAssignedBooks: () => {
      dispatch(fetchAssignedBooks());
    },
    onSaveResponse: ({ assignmentId, type, url }) => {
      dispatch(saveResponse({ assignmentId, type, url }));
    }
  };
};

class UrlComponent extends Component {
  constructor(props) {
    super(props);
    const _type = this.props.route.path.split('/')[0];

    this.state = {
      currentAssignment: null,
      url: null,
      type: _type
    };
  }

  componentDidMount() {
    const assignmentId = parseInt(this.props.params.assignmentId, 10);
    const assignedBooks = this.props.assignedBooks;
    const _currentAssignment = assignedBooks.find(
      assignment => assignment.id === assignmentId);
    const hasFetchedAssignment = _currentAssignment != undefined;

    if (!hasFetchedAssignment) {
      this.props.onFetchAssignedBooks();
    } else {
      this.setState({ currentAssignment: _currentAssignment });
    }
  }

  componentWillReceiveProps(nextProps) {
    const assignmentId = parseInt(nextProps.params.assignmentId, 10);
    const assignedBooks = nextProps.assignedBooks;
    const _currentAssignment = assignedBooks.find(assignment => assignment.id === assignmentId);

    if (_currentAssignment !== undefined) {
      this.setState({ currentAssignment: _currentAssignment });
    }
  }

  onSave() {
    const props = {
      type: this.state.type,
      url: this.state.url,
      assignmentId: this.state.currentAssignment.id
    };

    this.props.onSaveResponse(props);
  }

  render() {
    if (this.state.currentAssignment) {
      return (
        <div className='video-link-container'>
          <div className='header-response-container'>
            <span className='header-response-title'>
              Your response for:
            </span>
            <span className='header-response-details'>
              <b>
                {this.state.currentAssignment.book.title}
              </b> by {this.state.currentAssignment.book.author}
            </span>
          </div>
          <div className='url-input-wrapper'>
            <input
              className='url-input'
              placeholder='Enter an url'
              onChange={(e) => { this.setState({ url: e.target.value });}}
            />
          </div>
          <div className='response-actions'>
            <button
              className='add-book-submit-button'
              disabled={this.state.url === null}
              onClick={() => { this.onSave(); }}
            >
              Save
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className='write-response-container'>Loading</div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UrlComponent);
