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
            <span>
              {this.state.currentAssignment.book.title}
              -
              {this.state.currentAssignment.book.author}
            </span>
          </div>
          <div>
            <TextField
              hintText='Url'
              onChange={(e) => { this.setState({ url: e.target.value });}}
            />
          </div>
          <div className='response-actions'>
            <FlatButton
              label='Save' primary
              disabled={this.state.url === null}
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

export default connect(mapStateToProps, mapDispatchToProps)(UrlComponent);
