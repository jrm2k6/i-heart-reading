import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchAssignedBooks,
  deleteAssignment,
  markBookAsRead,
  updateAssignmentProgress
} from '../actions/crudActions';
import { browserHistory } from 'react-router';
import IconButton from 'material-ui/lib/icon-button';
import Popover from 'material-ui/lib/popover/popover';
import RaisedButton from 'material-ui/lib/raised-button';

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
        <div className='my-books-container'>
          <span className='my-books-title-section'>Your books</span>
          <div className='my-books-list-container'>
            <div className='my-books-list-header'>
              <span className='book-properties'>Title</span>
              <span className='book-properties'>Author</span>
              <span className='book-properties'>Pages Read</span>
              <span className='book-properties'>Progress</span>
              <span className='book-actions'></span>
            </div>
            <div>
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
            </div>
          </div>
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
        <UploadResponseButton assignmentId={id}/> : null;

  return (
    <div className='my-books-item' key={id}>
      <span className='book-properties'>{title}</span>
      <span className='book-properties'>{author}</span>
      <span className='book-properties'>{pagesProgression}</span>
      <span className='book-properties'>{percentProgression}</span>
      <div className='book-actions'>
        <div className='assignment-options'>
          <IconButton
            iconClassName='material-icons'
            onClick={onClickEdit}
          >
            create
          </IconButton>
          <IconButton
            iconClassName='material-icons'
            iconStyle={{ color: '#d50000' }}
            onClick={() => onDeleteAssignedBook(id)}
          >
            delete_forever
          </IconButton>
          {markAsReadOption}
          {uploadResponseOption}
        </div>
      </div>
    </div>
  );
};

class UploadResponseButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingOptions: false,
      anchorEl: null
    };
  }

  render() {
    return (
      <div>
        <IconButton
          iconClassName='material-icons'
          iconStyle={{ color: '#00bfe8' }}
          onClick={(e) => this.setState({ showingOptions: true, anchorEl: e.currentTarget })}
        >
        cloud_upload
      </IconButton>
        <Popover
          open={this.state.showingOptions}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'center' }}
          targetOrigin={{ horizontal: 'left', vertical: 'center' }}
          onRequestClose={() => this.setState({ showingOptions: false })}
        >
          <div className='popover-response-options'>
            <RaisedButton
              className='popover-response-option'
              primary
              label='Write A Response'
              onClick={() => browserHistory.push(`/app/responses/write/${this.props.assignmentId}`)}
            />
            <RaisedButton primary label='Upload A Text File' />
            <RaisedButton
              className='popover-response-option'
              primary
              label='Upload A Video File'
              onClick={() => browserHistory.push(`/app/responses/video/${this.props.assignmentId}`)}
            />
            <RaisedButton
              className='popover-response-option'
              primary
              label='Upload An Image File'
              onClick={() => browserHistory.push(`/app/responses/image/${this.props.assignmentId}`)}
            />
          </div>
        </Popover>
      </div>
    );
  }
}

const MarkAsReadOption = ({ clickHandler }) => (
  <IconButton
    onClick={clickHandler}
    iconStyle={{ color: '#20bb51' }}
    iconClassName='material-icons'
  >
    done
  </IconButton>
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
      <div className='my-books-item' key={this.props.id}>
        <span className='book-properties'>{this.props.properties.title}</span>
        <span className='book-properties'>{this.props.properties.author}</span>
        <div className='book-properties'>
          <input defaultValue={this.state.nbPagesRead}
            onChange={(e) => this.onChange(e)}
          >
          </input>
        </div>
        <span className='book-properties'>
          {this.props.properties.percentProgression}
        </span>
        <div className='book-actions'>
          <div >
            <IconButton
              iconClassName='material-icons'
              onClick={() =>
                this.props.onClickSave(this.props.properties.progressId, this.state.numPagesRead)
              }
            >
              save
            </IconButton>
            <IconButton
              iconStyle={{ color: '#d50000' }}
              iconClassName='material-icons'
              onClick={() => this.props.onDeleteAssignedBook(this.props.properties.id)}
            >
              delete_forever
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookComponent);
