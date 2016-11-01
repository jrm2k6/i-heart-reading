import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';

class TimelineItem extends React.Component {
  getUpdateContent() {
    const { update } = this.props;
    const when = moment(update.updated_at).fromNow();
    if (update.assignment) {
      const book = update.assignment.book;
      const wasMarkedAsRead = update.mark_book_read === 1;
      const numPagesRead = update.num_pages_read;

      if (wasMarkedAsRead) {
        return (
          <div className='timeline-update-row'>
            <div className='circle book-read' />
            <span className='update-row-content'>
              {book.title} by {book.author} was marked as read
            </span>
            <span className='update-row-readable-time'>({when})</span>
          </div>
        );
      }

      return (
        <div className='timeline-update-row'>
          <div className='circle pages-read' />
          <span className='update-row-content'>
            Read {numPagesRead} pages of {book.title} by {book.author}
          </span>
          <span className='update-row-readable-time'>({when})</span>
        </div>
      );
    }

    const circleColor = this.getCircleColor(update);
    const _className = `circle ${circleColor}`;
    const linkContent = `/app/responses/student-response/${update.id}`;
    return (
      <div className='timeline-update-row'>
        <div className={_className} />
        <span className='update-row-content'>
          Submitted a response for {update.book.title} by {update.book.author}
        </span>
        <span className='update-row-readable-time'>({when})</span>
        <div className='option-response-item'>
          <span className='update-row-readable-time'>
            <Link className='link-response' to={linkContent}>View response</Link>
          </span>
        </div>
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

  getCircleColor(update) {
    return (update.currentReview) ? update.currentReview.decision_type_name
      : 'no-decision';
  }
}

export default TimelineItem;
