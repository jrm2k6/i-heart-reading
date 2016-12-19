import React, { Component } from 'react';
import DashboardTeacherComponent from './DashboardTeacherComponent';

class TeacherStats extends Component {
  render() {
    const className = `stats-container-item ${this.props.className}`;
    const content = `${this.props.teachers.length} teachers`;

    const closeButton = (this.props.showingComponent) ?
      (<div className='stats-container-item-close' onClick={this.props.closeComponent}>
        <i className='material-icons'>close</i>
        </div>) : null;

    const expandButton = (!this.props.showingComponent) ?
      (<div className='stats-container-item-expand'
        onClick={() => { if (!this.props.showingComponent) {
          this.props.showComponent(<DashboardTeacherComponent admins={this.props.admins}/>);
        }}}
      >
        <i className='material-icons'>keyboard_arrow_down</i>
      </div>) : null;

    return (
      <div className={className}>
        <div className='stats-container-item-horizontal-content'>
          <div className='stats-container-item-horizontal-content-left'>{content}</div>
          {closeButton}
        </div>
        {expandButton}
      </div>
    );
  }
}

export default TeacherStats;
