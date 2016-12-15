import React, { Component } from 'react';
import DashboardGroupsComponent from './DashboardGroupsComponent';

class GroupStats extends Component {
  render() {
    return (
      <div className='stats-container-item'>
        <div>{this.props.groups.length} groups</div>
        <div className='stats-container-item-expand'
          onClick={() => { if (!this.props.showingComponent) {
            this.props.showComponent(<DashboardGroupsComponent />);
          }}}
        >
          <i className='material-icons'>keyboard_arrow_down</i>
        </div>
      </div>
    );
  }
}

export default GroupStats;
