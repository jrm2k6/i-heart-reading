import React from 'react';
import { connect } from 'react-redux';
import { fetchStudent } from '../../actions/studentSearchActions';
import { fetchStats, fetchUpdates } from '../../actions/crudActions';

const mapStateToProps = (state) => {
  return {
    currentStudent: state.studentReducer.currentStudent
  };
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
    const { currentStudent } = this.props;
    let content = '...';
    if (currentStudent && currentStudent.stats && currentStudent.stats.yearly) {
      const numBooksRead = currentStudent.stats.yearly.books_read;
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
    const { currentStudent } = this.props;
    let content = '...';
    if (currentStudent && currentStudent.stats && currentStudent.stats.yearly) {
      const pagesRead = currentStudent.stats.yearly.num_pages_read;
      const pagesWord = parseInt(pagesRead, 10) > 1 ? 'pages' : 'page';
      content = `${pagesRead} ${pagesWord} read!`;
    }
    return (
      <div className='right-section'>
        {content}
      </div>
    );
  }


  render() {
    const { currentStudent } = this.props;

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
              </div>
            </div>
          </div>
          <div className='profile-container-timeline'>
            Random timeline
          </div>
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
