import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import FontIcon from 'material-ui/lib/font-icon';

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
    onSaveResponse: ({ assignmentId, type, file }) => {
      dispatch(saveResponse({ assignmentId, type, file }));
    }
  };
};

class UploadImageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAssignment: null,
      fileToUpload: null
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
      type: 'image',
      file: this.state.fileToUpload,
      assignmentId: this.state.currentAssignment.id
    };

    this.props.onSaveResponse(props);
  }

  render() {
    if (this.state.currentAssignment) {
      const previews = (this.state.fileToUpload) ?
        (<div className='previews'>
          <div className='replace-current-image'>
            <FontIcon
              className='material-icons'
              style={{ color: '#fff', fontSize: '65px' }}
            >
              replay
            </FontIcon>
            <span>Click to replace</span>
          </div>
          <img src={this.state.fileToUpload.preview} />
        </div>)
        : null;

      const contentHint = (!this.state.fileToUpload) ?
        (
          <div className='dropzone-hint-no-photo'>
            <FontIcon
              style={{ color: '#00bfe8', fontSize: '100px' }}
              className='material-icons'
            >
              add_a_photo
            </FontIcon>
            <span className='dropzone-first-hint'>Drop an image to upload</span>
            <span className='dropzone-second-hint'>(or click!)</span>
          </div>
        )
        : null;

      return (
        <div className='upload-image-container'>
          <div className='header-response-container'>
            <span className='header-response-title'>
              Your response for:
            </span>
            <span className='header-response-details'>
              <b>{this.state.currentAssignment.book.title}</b> by {this.state.currentAssignment.book.author}
            </span>
          </div>
          <div className='upload-image-dropzone'>
            <Dropzone
              className='upload-image-dropzone-element'
              onDrop={(files) => { this.setState({ fileToUpload: files[0] }); }}
              multiple={false}
              accept={'image/*'}
            >
              <div className='dropzone-hint'>
                {contentHint}
                {previews}
              </div>
            </Dropzone>
          </div>
          <div className='upload-image-response-actions'>
            <button
              className='add-book-submit-button'
              disabled={this.state.fileToUpload === null}
              onClick={() => { this.onSave(); }}
            >
              Save
            </button>
            <button
              className='clear-image-button'
              disabled={this.state.fileToUpload === null}
              onClick={() => { this.setState({ fileToUpload: null }); }}
            >
              Clear
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadImageComponent);
