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
            <div className='teacher-reviews-list'>
              <div className='assignment-review-item-header'>
                <div>Student</div>
                <div>Book</div>
                <div>Response</div>
                <div>Status</div>
              </div>
              {this.props.assignmentsToReview.map(assignmentToReview => (
                <AssignmentToReviewItem assignmentToReview={assignmentToReview} />
              ))}
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
