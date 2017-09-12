import React, { Component } from 'react';
import DashboardTeacherComponent from './DashboardTeacherComponent';

class TeacherStats extends Component {
  render() {
    const className = `stats-container-item ${this.props.className} orange`;
    const content = `${this.props.teachers.length}`;

    const closeButton = (this.props.showingComponent) ?
      (<div className='stats-container-item-close' onClick={this.props.closeComponent}>
        <i className='material-icons'>close</i>
        </div>) : null;

    const expandButton = (!this.props.showingComponent) ?
      (<div className='stats-container-item-expand'>
        <i className='material-icons'>keyboard_arrow_down</i>
      </div>) : null;

    return (
      <div className={className}
        onClick={() => { if (!this.props.showingComponent) {
          this.props.showComponent(DashboardTeacherComponent);
        }}}
      >
        <div className='stats-container-item-horizontal-content'>
        <div className='stats-container-item-horizontal-content-left'>
          <div className='stats-container-item-left'>
            <i className='material-icons'>school</i>
            <div>
              <span className='number'>{content}</span>
              <span className='description'>teachers</span>
            </div>
          </div>
        </div>
          {closeButton}
        </div>
        {expandButton}
      </div>
    );
  }
}

export default TeacherStats;
