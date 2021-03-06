import React, { Component } from 'react';
import { Link } from 'react-router';

class StudentSection extends Component {
  render() {
    const { student } = this.props;
    return (
        <span className='review-properties'>
          {student.name}
        </span>
    );
  }
}

class BookSection extends Component {
  render() {
    const { book } = this.props;

    return (
        <span className='review-properties'>
          {book.title} ({book.author})
        </span>
    );
  }
}

class ResponseSection extends Component {
  getResponseTypeIcon() {
    const { response } = this.props;

    switch (response.response_type_name) {
      case 'text':
        return <i className='material-icons'>create</i>;

      case 'image':
        return <i className='material-icons'>insert_photo</i>;

      case 'video':
        return <i className='material-icons'>movie</i>;

      default:
        return <span></span>

    }
  }
  render() {
    const responseTypeIcon = this.getResponseTypeIcon();
    return (
        <span className='review-actions'>
          {responseTypeIcon}
        </span>
    );
  }
}

class ReviewStatusSection extends Component {
  getIconReview() {
    const { review } = this.props;
    if (review && review.decision_type_name) {
      if (review.decision_type_name === 'rejected') {
        return (
          <i className='material-icons rejected'>thumb_down</i>
        );
      } else {
        return (
          <i className='material-icons accepted'>thumb_up</i>
        );
      }
    }

    return (
      <i className='material-icons'>hourglass_empty</i>
    );
  }

  getButton() {
    const { review, linkContent } = this.props;
    let textContent = 'Review';

    if (review && review.decision_type_name && review.decision_type_name === 'accepted') {
      textContent = 'View';
    }

    return (
      <Link className='link-response' to={linkContent}>{textContent}</Link>
    );
  }

  render() {
    const { review, showIcon } = this.props;
    const content = (showIcon) ? this.getIconReview() : this.getButton();

    return (
      <span className='review-actions'>
        {content}
      </span>
    );
  }
}

module.exports = {
  ReviewStatusSection,
  StudentSection,
  ResponseSection,
  BookSection
}
