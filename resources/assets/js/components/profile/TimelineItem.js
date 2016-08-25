import React from 'react';
import moment from 'moment';

class TimelineItem extends React.Component {
  getUpdateContent() {
    const { update } = this.props;
    const book = update.assignment.book;
    const wasMarkedAsRead = update.mark_book_read === 1;
    const numPagesRead = update.num_pages;
    const when = moment(update.updated_at).fromNow();

    if (wasMarkedAsRead) {
      return (
        <div>
          <span>{book.title} by {book.author} was marked as read</span>
          <span className='update-row-readable-time'>({when})</span>
        </div>
      );
    }

    return (
      <div>
        <span>Read {numPagesRead} of {book.title} by {book.author}</span>
        <span className='update-row-readable-time'>({when})</span>
      </div>
    );
  }

  render() {
    return (
      <div className='profile-container-timeline-item'>
        {this.getUpdateContent()}
      </div>
    );
  }
}

export default TimelineItem;
