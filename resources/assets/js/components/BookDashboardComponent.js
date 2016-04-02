import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchAssignedBooks,
  deleteAssignment,
  markBookAsRead,
  updateAssignmentProgress
} from '../actions/crudActions';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import ActionDelete from 'material-ui/lib/svg-icons/action/delete';
import ContentCreate from 'material-ui/lib/svg-icons/content/create';
import ContentSave from 'material-ui/lib/svg-icons/content/save';

const mapStateToProps = (state) => {
  return {
    books: state.bookReducers.assignedBooks
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchAssignedBooks: () => {
      dispatch(fetchAssignedBooks());
    },

    onDeleteAssignedBook: (id) => {
      dispatch(deleteAssignment(id));
    },

    onUpdateAssignmentProgress: (id, numPages) => {
      dispatch(updateAssignmentProgress(id, numPages));
    },

    onMarkBookAsRead: (id) => {
      dispatch(markBookAsRead(id));
    }
  };
};

class BookComponent extends Component {
  componentDidMount() {
    this.props.onFetchAssignedBooks();
  }

  getProperties(item) {
    const res = {};
    res.id = item.id;
    res.title = item.book.title;
    res.author = item.book.author;

    let pagesProgression = `0/${item.book.num_pages}`;
    let percentProgression = '0%';
    let progressId = null;
    let isRead = false;

    if (item.progress !== null) {
      pagesProgression = `${item.progress.num_pages_read}/${item.book.num_pages}`;
      percentProgression = `${Math.round(
        +item.progress.num_pages_read / item.book.num_pages * 100)}%`;
      progressId = item.progress.id;
      isRead = item.progress.is_read;
    }

    res.pagesProgression = pagesProgression;
    res.percentProgression = percentProgression;
    res.progressId = progressId;
    res.isRead = isRead;

    return res;
  }

  render() {
    return (
        <div>
          <span>Your books</span>
          <table>
            <thead>
              <tr>
                <td>Title</td>
                <td>Author</td>
                <td>Pages Read</td>
                <td>Progress</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {this.props.books.map((item) => {
                return (
                  <AssignmentItem
                    properties={this.getProperties(item)}
                    onDeleteAssignedBook={this.props.onDeleteAssignedBook}
                    onUpdateAssignmentProgress={this.props.onUpdateAssignmentProgress}
                    onMarkBookAsRead={this.props.onMarkBookAsRead}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
    );
  }
}

class AssignmentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inEditMode: false
    };
  }

  render() {
    const component = (!this.state.inEditMode) ?
      <ReadOnlyAssignmentItem
        properties={this.props.properties}
        onDeleteAssignedBook={this.props.onDeleteAssignedBook}
        onClickEdit={() => this.setState({ inEditMode: true })}
        onClickMarkAsRead={this.props.onMarkBookAsRead}
      />
    :
      <EditableAssignmentItem
        properties={this.props.properties}
        onDeleteAssignedBook={this.props.onDeleteAssignedBook}
        onClickSave={(id, numPages) => {
          this.setState({ inEditMode: false });
          this.props.onUpdateAssignmentProgress(id, numPages);
        }}
      />;

    return component;
  }
}

const ReadOnlyAssignmentItem = ({ properties, onDeleteAssignedBook,
    onClickEdit, onClickMarkAsRead }) => {
  const { id, title, author, pagesProgression, percentProgression, isRead } = properties;
  let markAsReadOption = (percentProgression === '100%' && !isRead) ?
        <MarkAsReadOption clickHandler={() => onClickMarkAsRead(id)} /> : null;

  let uploadResponseOption = (isRead) ?
        <UploadResponseOption /> : null;

  return (
    <tr key={id}>
      <td>{title}</td>
      <td>{author}</td>
      <td>{pagesProgression}</td>
      <td>{percentProgression}</td>
      <td>
        <div >
          <IconButton
            onClick={onClickEdit}
          >
            <ContentCreate />
          </IconButton>
          <IconButton
            onClick={() => onDeleteAssignedBook(id)}
          >
            <ActionDelete />
          </IconButton>
          {markAsReadOption}
          {uploadResponseOption}
        </div>
      </td>
    </tr>
  );
};

const UploadResponseOption = () => (
  <FlatButton
    label='Upload Response' primary
  />
);

const MarkAsReadOption = ({ clickHandler }) => (
  <FlatButton
    label='Mark as Read'
    onClick={clickHandler}
    secondary
  />
);

class EditableAssignmentItem extends Component {
  constructor(props) {
    super(props);
    const { pagesProgression } = this.props.properties;
    const [_numPagesRead, _maxNumPages] = pagesProgression.split('/');
    this.state = {
      numPagesRead: parseInt(_numPagesRead, 10),
      maxNumPages: parseInt(_maxNumPages, 10)
    };
  }

  onChange(e) {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val <= this.state.maxNumPages) {
      this.setState({ numPagesRead: val });
    }
  }

  render() {
    return (
      <tr key={this.props.id}>
        <td>{this.props.properties.title}</td>
        <td>{this.props.properties.author}</td>
        <td>
          <input defaultValue={this.state.nbPagesRead}
            onChange={(e) => this.onChange(e)}
          >
          </input>
        </td>
        <td>{this.props.properties.percentProgression}</td>
        <td>
          <div >
            <IconButton
              onClick={() =>
                this.props.onClickSave(this.props.properties.progressId, this.state.numPagesRead)
              }
            >
              <ContentSave />
            </IconButton>
            <IconButton
              onClick={() => this.props.onDeleteAssignedBook(this.props.properties.id)}
            >
              <ActionDelete />
            </IconButton>
            <FlatButton
              label='Mark as Read' secondary
            />
          </div>
        </td>
      </tr>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookComponent);
