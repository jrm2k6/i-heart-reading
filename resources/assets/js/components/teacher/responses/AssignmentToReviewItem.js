import React, { Component } from 'react';
import IconButton from 'material-ui/lib/icon-button';
import {
  StudentSection,
  BookSection,
  ResponseSection,
  ReviewStatusSection
} from './ReviewSections';

class AssignmentToReviewItem extends Component {
  constructor(props) {
      super(props);

      this.state = {
        isHovered: false
      };
  }

  render() {
    const { assignmentToReview } = this.props;
    const student = assignmentToReview.user;
    const book = assignmentToReview.book;
    const response = assignmentToReview.response;
    const review = assignmentToReview.current_review;
    const linkContent = `/app/responses/student-response/${assignmentToReview.response.id}`;

    return (
        <div className='assignment-review-item'
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

export default AssignmentToReviewItem;
