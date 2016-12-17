import React, { Component } from 'react';
import DashboardTeacherComponent from './DashboardTeacherComponent';

class TeacherStats extends Component {
  render() {
    return (
      <div className='stats-container-item'>
        <div>{this.props.teachers.length} teachers</div>
        <div className='stats-container-item-expand'
          onClick={() => { if (!this.props.showingComponent) {
            this.props.showComponent(<DashboardTeacherComponent admins={this.props.admins}/>);
          }}}
        >
          <i className='material-icons'>keyboard_arrow_down</i>
        </div>
      </div>
    );
  }
}

export default TeacherStats;
