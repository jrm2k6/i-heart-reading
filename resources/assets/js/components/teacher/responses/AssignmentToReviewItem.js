import React, { Component } from 'react';
import IconButton from 'material-ui/lib/icon-button';
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
    const review = assignmentToReview.current_review;
    return (
        <div className='assignment-review-item'>
          <StudentSection student={student} />
          <BookSection book={book} />
          <ResponseSection response={response} />
          <ReviewStatusSection review={review} />
          <span className='review-actions'>
            <IconButton
              iconClassName='material-icons'
              iconStyle={{
                color: '#00bfe8',
                fontSize: '24px'
              }}
              style={{ padding: '4px', border: '0', width: 'auto', height: 'auto' }}
            >
              insert_comment
            </IconButton>
            Review
          </span>
        </div>
    );
  }
}

export default AssignmentToReviewItem;
