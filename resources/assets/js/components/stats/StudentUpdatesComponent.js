import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router';

class StudentUpdatesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEndIndex: 20
    };
  }

  generateUpdatesRow() {
    const { currentEndIndex } = this.state;
    return this.props.latestUpdates
      .slice(0, currentEndIndex)
      .map((update, index) => {
        const studentId = update.assignment.user.id;
        const studentName = update.assignment.user.name;
        const bookTitle = update.assignment.book.title;
        const numPages = update.num_pages;
        const isRead = update.mark_book_read;
        const when = moment(update.updated_at).fromNow();

        const properties = { studentName, studentId, bookTitle, numPages, isRead, when };

        return <StudentUpdateRow key={index} properties={properties} />
      });
  }

  render() {
    const { latestUpdates } = this.props;
    const rows = (latestUpdates && latestUpdates.length > 0)
      ? this.generateUpdatesRow(latestUpdates)
      : 'No Updates!';

    return (
      <div className='student-updates'>
        <div className='student-updates-title'>
          Your students updates
        </div>
        <div className='student-updates-content'>
          {rows}
        </div>
        <div className='student-updates-more'>
          <button
            className='student-updates-more-btn'
            onClick={() => {
              if (this.state.currentEndIndex < latestUpdates.length) {
                this.setState({ currentEndIndex: this.state.currentEndIndex + 10 });
              }
            }}
            disabled={!latestUpdates || this.state.currentEndIndex >= latestUpdates.length}
          >
            See More
          </button>
        </div>
      </div>
    );
  }
}

const StudentUpdateRow = ({ properties }) => {
  let text = '';
  if (properties.isRead) {
    text = `${properties.studentName} marked ${properties.bookTitle} as read.`;
  } else {
    text = `${properties.studentName} read ${properties.numPages} pages of ${properties.bookTitle}.`;
  }

  return (
    <div className='student-update-row'>
      <div className='student-update-avatar'>
        <Link to={`/app/student/${properties.studentId}`}>{properties.studentName[0]}</Link>
        </div>
      <span className='student-update-row-content'>
        {text}
      </span>
      <span className='student-update-row-readable-time'>({properties.when})</span>
    </div>
  );
}

export default StudentUpdatesComponent;
