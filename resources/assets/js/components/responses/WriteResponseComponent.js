import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchAssignedBooks,
  saveResponse
} from '../../actions/crudActions';
import { MarkdownEditor } from 'react-markdown-editor';

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
    onSaveResponse: ({ assignmentId, type, content }) => {
      dispatch(saveResponse({ assignmentId, type, content }));
    }
  };
};

class WriteResponseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAssignment: null,
      responseContent: ''
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

  handleOnContentChange(content) {
    this.setState({ responseContent: content });
  }

  render() {
    if (this.state.currentAssignment) {
      return (
          <div className='write-response-container'>
            <div className='header-response-container'>
              <span className='header-response-title'>
                Your response for:
              </span>
              <span className='header-response-details'>
                <b>{this.state.currentAssignment.book.title}</b> by {this.state.currentAssignment.book.author}
              </span>
            </div>
            <div className='markdown-editor-wrapper'>
              <MarkdownEditor initialContent=''
                iconsSet='font-awesome'
                onContentChange={(content) => {this.handleOnContentChange(content);}}
              />
            </div>
          <div className='response-actions'>
            <button
              className='add-book-submit-button'
              disabled={this.state.responseContent.trim().length === 0}
              onClick={() => {this.saveResponse();}}
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

  saveResponse() {
    const props = {
      type: 'text',
      content: this.state.responseContent,
      assignmentId: this.state.currentAssignment.id
    };

    this.props.onSaveResponse(props);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WriteResponseComponent);
