import React, { Component } from 'react';
import {
  StudentSection,
  BookSection,
  ResponseSection,
  ReviewStatusSection
} from './ReviewSections';

class AssignmentToReviewItem extends Component {
  render() {
    const { assignmentToReview } = this.props;
    const student = assignmentToReview.user;
    const book = assignmentToReview.book;
    const response = assignmentToReview.response;
    const reviews = assignmentToReview.reviews;
    return (
        <div className='assignment-review-item'>
          <StudentSection student={student} />
          <BookSection book={book} />
          <ResponseSection response={response} />
          <ReviewStatusSection reviews={reviews} />
        </div>
    );
  }
}

export default AssignmentToReviewItem;
