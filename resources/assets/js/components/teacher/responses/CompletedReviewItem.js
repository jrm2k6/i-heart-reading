import React, { Component } from 'react';
import {
  StudentSection,
  BookSection,
  ResponseSection,
  ReviewStatusSection
} from './ReviewSections';

class CompletedReviewItem extends Component {
  render() {
    const { completedReview } = this.props;
    const student = completedReview.user;
    const book = completedReview.book;
    const response = completedReview.response;
    const review = completedReview.current_review;

    return (
        <div className='completed-review-item'>
          <StudentSection student={student} />
          <BookSection book={book} />
          <ResponseSection response={response} />
          <ReviewStatusSection review={review} />
        </div>
    );
  }
}

export default CompletedReviewItem;
