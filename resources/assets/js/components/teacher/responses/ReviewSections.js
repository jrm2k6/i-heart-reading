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
    const linkContent = `/app/student-response/${response.id}`
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
    const { reviews } = this.props;

    if (reviews.length > 0) {
      return (
          <div className='assignment-review-review-section'>
            <span>{reviews[0].decision_type.id}</span>
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
