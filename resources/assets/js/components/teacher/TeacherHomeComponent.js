import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStudentsUpdates } from '../../actions/teacherReviewsActions';
import StudentUpdatesComponent from '../stats/StudentUpdatesComponent';
import SearchStudentComponent from './SearchStudentComponent';


const mapStateToProps = (state) => {
  return {
    studentUpdates: state.teacherReviewsReducer.updates
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudentUpdates: () => { dispatch(fetchStudentsUpdates()); }
  };
};

class TeacherHomeComponent extends Component {
  componentDidMount() {
    this.props.fetchStudentUpdates();
  }

  render() {
    return (
      <div className='home-component-container teacher-home-component-container'>
        <SearchStudentComponent />
        <StudentUpdatesComponent latestUpdates={this.props.studentUpdates} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherHomeComponent);
