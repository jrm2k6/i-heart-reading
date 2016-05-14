import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAssignmentsToReview } from '../../../actions/teacherReviewsActions';
import AssignmentToReviewItem from './AssignmentToReviewItem';

const mapStateToProps = (state) => {
  return {
    assignmentsToReview: state.teacherReviewsReducer.assignmentsToReview
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAssignmentsToReview: () => {
      dispatch(fetchAssignmentsToReview());
    }
  };
};


class TeacherResponsesDashboardComponent extends Component {
  componentDidMount() {
    this.props.fetchAssignmentsToReview();
  }

  render() {
    if (this.props.assignmentsToReview) {
      return (
          <div className='teacher-dashboard-container'>
            <span className='teacher-dashboard-title-section'>My reviews</span>
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
            <div className='completed-review-action-container'>
              <button className='see-completed-reviews'>
                See Completed Reviews
              </button>
            </div>
          </div>
      );
    } else {
      return (
        <div className='teacher-dashboard-container'>
          Loading
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherResponsesDashboardComponent);
