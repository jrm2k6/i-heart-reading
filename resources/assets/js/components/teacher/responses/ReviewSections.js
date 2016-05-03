import React, { Component } from 'react';
import { Link } from 'react-router';

class StudentSection extends Component {
  render() {
    const { student } = this.props;
    return (
        <div className='assignment-review-student-section'>
          <span>{student.name}</span>
        </div>
    );
  }
}

class BookSection extends Component {
  render() {
    const { book } = this.props;

    return (
        <div className='assignment-review-book-section'>
          <span>{book.title} ({book.author})</span>
        </div>
    );
  }
}

class ResponseSection extends Component {
  render() {
    const { response } = this.props;
    const linkContent = `/app/responses/student-response/${response.id}`
    return (
        <div className='assignment-review-response-section'>
          <Link to={linkContent}>
          <span>{response.response_type_id}</span>
          </Link>
        </div>
    );
  }
}

class ReviewStatusSection extends Component {
  render() {
    const { review } = this.props;

    if (review) {
      return (
          <div className='assignment-review-review-section'>
            <span>{review.decision_type_id}</span>
          </div>
      );
    } else {
      return (
        <div className='assignment-review-review-section'>
          <span>No Review</span>
        </div>
      )
    }

  }
}

module.exports = {
  ReviewStatusSection,
  StudentSection,
  ResponseSection,
  BookSection
}
