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
    const { response } = this.props;
    const linkContent = `/app/responses/student-response/${response.id}`
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
      return (
        <i className='material-icons rejected'>thumb_down</i>
      );
    }

    return (
      <i className='material-icons'>hourglass_empty</i>
    );
  }

  render() {
    const iconReview = this.getIconReview();
    return (
      <span className='review-actions'>
        {iconReview}
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
