import React from 'react';
import { connect } from 'react-redux';
import { fetchStudent } from '../../actions/studentSearchActions';
import { fetchStats, fetchUpdates } from '../../actions/crudActions';
import StudentTimeline from './StudentTimeline';

const mapStateToProps = (state) => {
  const _state = {};

  _state.currentStudent = state.studentReducer.currentStudent;

  if (_state.currentStudent) {
    _state.currentStudentStats = state.studentReducer.stats[_state.currentStudent.id];
    _state.currentStudentUpdates = state.studentReducer.updates[_state.currentStudent.id];
  }

  return _state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudent: (id) => {
      dispatch(fetchStudent(id));
    },

    fetchStats: (id) => {
      dispatch(fetchStats(id));
    },

    fetchUpdates: (id) => {
      dispatch(fetchUpdates(id));
    }
  };
};

class ProfileComponent extends React.Component {
  getYearlyBooksRead() {
    const { currentStudentStats } = this.props;
    let content = '...';
    if (currentStudentStats && currentStudentStats.yearly) {
      const numBooksRead = currentStudentStats.yearly.books_read;
      const booksWord = parseInt(numBooksRead, 10) > 1 ? 'books' : 'book';
      content = `${numBooksRead} ${booksWord} read!`;
    }
    return (
      <div className='right-section'>
        {content}
      </div>
    );
  }

  getYearlyPagesRead() {
    const { currentStudentStats } = this.props;
    let content = '...';
    if (currentStudentStats && currentStudentStats.yearly) {
      const pagesRead = currentStudentStats.yearly.num_pages_read;
      const pagesWord = parseInt(pagesRead, 10) > 1 ? 'pages' : 'page';
      content = `${pagesRead} ${pagesWord} read!`;
    }
    return (
      <div className='right-section'>
        {content}
      </div>
    );
  }

  getNumAcceptedResponses() {
    const { currentStudentUpdates } = this.props;
    if (currentStudentUpdates) {
      const responses = currentStudentUpdates.filter(
        update => update.response_type_id !== undefined
      );
      const acceptedResponses = responses.filter(
        response => response.currentReview !== null &&
          response.currentReview.decision_type_name === 'accepted'
      );
      const numAcceptedResponses = acceptedResponses.length;

      const content = (numAcceptedResponses === 0) ? 'No accepted responses!'
        : (numAcceptedResponses > 1) ? `${numAcceptedResponses} accepted responses!`
          : '1 accepted response!';
      return (
        <div className='right-section'>
          {content}
        </div>
      );
    }

    return (
      <div className='right-section'>...</div>
    );
  }

  render() {
    const { currentStudent, currentStudentUpdates } = this.props;

    if (currentStudent) {
      const firstLetter = (currentStudent.name) ? currentStudent.name[0] : '?';
      return (
        <div className='profile-page-container'>
          <div className='profile-left'>
            <div className='profile-container-basic-info'>
              <div className='profile-basic-info-row'>
                <div className='profile-avatar'>
                  {firstLetter}
                </div>
                <div className='profile-basic-info'>
                  <div className='profile-name'>{currentStudent.name}</div>
                  <div className='profile-email'>{currentStudent.email}</div>
                </div>
              </div>
              <div className='profile-container-stats'>
                <div className='profile-number-books-read'>
                  <div className='left-section'>
                    <i className='material-icons'>import_contacts</i>
                  </div>
                  {this.getYearlyBooksRead()}
                </div>
                <div className='profile-number-pages-read'>
                  <div className='left-section'>
                    <i className='material-icons'>insert_drive_file</i>
                  </div>
                  <div className='right-section'>
                    {this.getYearlyPagesRead()}
                  </div>
                </div>
                <div className='profile-number-accepted-responses'>
                  <div className='left-section'>
                    <i className='material-icons'>done</i>
                  </div>
                  <div className='right-section'>
                    {this.getNumAcceptedResponses()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <StudentTimeline updates={currentStudentUpdates} />
        </div>
      );
    }

    return null;
  }

  componentDidMount() {
    const { id } = this.props.params;
    this.props.fetchStudent(id);
    this.props.fetchStats(id);
    this.props.fetchUpdates(id);
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
