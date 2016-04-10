import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchAssignedBooks,
  saveResponse
} from '../../actions/crudActions';
import { MarkdownEditor } from 'react-markdown-editor';
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

  handleOnContentChange(content) {
    this.setState({ responseContent: content });
  }

  render() {
    if (this.state.currentAssignment) {
      return (
          <div className='write-response-container'>
            <div className='header-response-container'>
              <span>
                {this.state.currentAssignment.book.title}
                -
                {this.state.currentAssignment.book.author}
              </span>
            </div>
            <div className='markdown-editor-wrapper'>
              <MarkdownEditor initialContent=''
                iconsSet='font-awesome'
                onContentChange={(content) => {this.handleOnContentChange(content);}}
              />
            </div>
          <div className='response-actions'>
            <FlatButton
              label='Save' primary
              disabled={this.state.responseContent.trim().length === 0}
              className='save-response-button'
              onClick={() => {this.saveResponse();}}
            />
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
