import React, { Component } from 'react';
import TextField from 'material-ui/lib/text-field';
import { connect } from 'react-redux';

import {
  fetchAssignedBooks,
  saveResponse
} from '../../actions/crudActions';

import FlatButton from 'material-ui/lib/flat-button';

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

class VideoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAssignment: null,
      videoUrl: null
    };
  }

  componentDidMount() {
    const assignmentId = parseInt(this.props.params.assignmentId, 10);
    const assignedBooks = this.props.assignedBooks;
    const hasFetchedAssignment = assignedBooks.findIndex(
      assignment => assignment.id === assignmentId) !== -1;

    if (!hasFetchedAssignment) {
      this.props.onFetchAssignedBooks();
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
      type: 'video',
      url: this.state.videoUrl,
      assignmentId: this.state.currentAssignment.id
    };

    this.props.onSaveResponse(props);
  }

  render() {
    if (this.state.currentAssignment) {
      return (
        <div className='video-link-container'>
          <div className='header-response-container'>
            <span>
              {this.state.currentAssignment.book.title}
              -
              {this.state.currentAssignment.book.author}
            </span>
          </div>
          <div>
            <TextField
              hintText='Video Url'
              onChange={(e) => { this.setState({ videoUrl: e.target.value });}}
            />
          </div>
          <div className='response-actions'>
            <FlatButton
              label='Save' primary
              disabled={this.state.videoUrl === null}
              className='save-response-button'
              onClick={() => { this.onSave(); }}
            />
          </div>
        </div>
      );
    }

    return (
      <div className='write-response-container'>Loading</div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoComponent);
