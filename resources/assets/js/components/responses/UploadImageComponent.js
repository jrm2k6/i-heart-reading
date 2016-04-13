import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';

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

  render() {
    if (this.state.currentAssignment) {
      const previews = (this.state.fileToUpload) ?
        (<div className='previews'>
          <img width={100} height={100} src={this.state.fileToUpload.preview} />
        </div>)
        : null;

      return (
        <div className='upload-image-container'>
          <div className='header-response-container'>
            <span>
              {this.state.currentAssignment.book.title}
              -
              {this.state.currentAssignment.book.author}
            </span>
          </div>
          <div className='upload-image-dropzone'>
            <Dropzone
              onDrop={(files) => { this.setState({ fileToUpload: files[0] }); }}
              multiple={false}
              accept={'image/*'}
            >
              <div>Drop your image in here</div>
              {previews}
            </Dropzone>
          </div>
          <div className='response-actions'>
            <FlatButton
              label='Save' primary
              disabled={this.state.fileToUpload === null}
              className='save-response-button'
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadImageComponent);
