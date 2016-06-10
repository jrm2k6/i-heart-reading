import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchAssignmentsToReview,
  fetchCompletedReviews
} from '../../../actions/teacherReviewsActions';
import AssignmentToReviewItem from './AssignmentToReviewItem';
import CompletedReviewItem from './CompletedReviewItem';

const mapStateToProps = (state) => {
  return {
    assignmentsToReview: state.teacherReviewsReducer.assignmentsToReview,
    completedReviews: state.teacherReviewsReducer.completedReviews
    ,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAssignmentsToReview: () => {
      dispatch(fetchAssignmentsToReview());
    },

    fetchCompletedReviews: () => {
      dispatch(fetchCompletedReviews());
    }
  };
};


class TeacherResponsesDashboardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingCompletedReviews: false
    };
  }

  componentDidMount() {
    this.props.fetchAssignmentsToReview();
  }

  getCompletedReviews() {
    if (this.props.completedReviews) {
      if (this.state.showingCompletedReviews) {
        if (this.props.completedReviews.length > 0) {
          return (
            <div className='teacher-dashboard-container'>
              <span className='teacher-dashboard-title-section'>My Completed Reviews</span>
              <div className='teacher-reviews-list'>
                <div className='assignment-review-item-header'>
                  <span className='review-properties'>Student</span>
                  <span className='review-properties'>Book</span>
                  <span className='review-actions'>Response</span>
                  <span className='review-actions'>Status</span>
                </div>
                {this.props.completedReviews.map(completedReview => (
                  <CompletedReviewItem
                    key={completedReview.id}
                    completedReview={completedReview}
                  />
                ))}
              </div>
            </div>
          );
        } else {
          return (
            <div>No Completed Reviews!</div>
          );
        }
      }
    }

    return null;
  }

  render() {
    const contentButton = (this.state.showingCompletedReviews) ?
      'Hide Completed Reviews' : 'Show Completed Reviews';
    const completedReviewsBtn = (
      <div className='completed-review-action-container'>
        <button
          onClick={() => { this.props.fetchCompletedReviews();
            this.setState({ showingCompletedReviews: !this.state.showingCompletedReviews });
          }}
          className='see-completed-reviews'>
          {contentButton}
        </button>
      </div>
    );

    const assignmentsToReviewTable = (this.props.assignmentsToReview) ? (
      <div className='teacher-dashboard-container'>
        <span className='teacher-dashboard-title-section'>My Reviews</span>
        <div className='teacher-reviews-list'>
          <div className='assignment-review-item-header'>
            <span className='review-properties'>Student</span>
            <span className='review-properties'>Book</span>
            <span className='review-actions'>Response</span>
            <span className='review-actions'>Status</span>
            <span className='review-actions'></span>
          </div>
          {this.props.assignmentsToReview.map(assignmentToReview => (
            <AssignmentToReviewItem
              key={assignmentToReview.id}
              assignmentToReview={assignmentToReview}
            />
          ))}
        </div>
      </div>
    ) : null;

    const completedReviewsTable = this.getCompletedReviews();

    return (
      <div>
        {assignmentsToReviewTable}
        {completedReviewsBtn}
        {completedReviewsTable}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherResponsesDashboardComponent);
