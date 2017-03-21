import React, { Component } from 'react';
import {
  StudentSection,
  BookSection,
  ResponseSection,
  ReviewStatusSection
} from './ReviewSections';

class CompletedReviewItem extends Component {
  constructor(props) {
      super(props);

      this.state = {
        isHovered: false
      };
  }

  render() {
    const { completedReview } = this.props;
    const student = completedReview.user;
    const book = completedReview.book;
    const response = completedReview.response;
    const review = completedReview.current_review;
    const linkContent = `/app/responses/student-response-accepted/${response.id}`;

    return (
        <div className='completed-review-item'
          onMouseEnter={ () => { this.setState({isHovered: true}); }}
          onMouseLeave={ () => { this.setState({isHovered: false}); }}
        >
          <StudentSection student={student} />
          <BookSection book={book} />
          <ResponseSection response={response} />
          <ReviewStatusSection
            review={review}
            showIcon={!this.state.isHovered}
            linkContent={linkContent}
          />
        </div>
    );
  }
}

export default CompletedReviewItem;
