import React, { Component } from 'react';
import DashboardTeacherComponent from './DashboardTeacherComponent';

class TeacherStats extends Component {
  constructor(props) {
      super(props);
      this.state = {
        showingDashboard: false
      };
  }

  render() {
    return (
      <div className='stats-container-item'>
        <div>{this.props.teachers.length} teachers</div>
        <div className='stats-container-item-expand'
          onClick={() => { if (!this.state.showingDashboard) {
            this.props.showComponent(<DashboardTeacherComponent />);
            this.setState({ showingDashboard: true }); }}
          }
        >
          <i className='material-icons'>keyboard_arrow_down</i>
        </div>
      </div>
    );
  }
}

export default TeacherStats;
