import React, { Component } from 'react';
import DashboardAdminComponent from './DashboardAdminComponent';

class AdminStats extends Component {
  render() {
    return (
      <div className='stats-container-item'>
        <div>{this.props.admins.length} admins</div>
        <div className='stats-container-item-expand'
          onClick={() => { if (!this.props.showingComponent) {
            this.props.showComponent(<DashboardAdminComponent />);
          }}}
        >
          <i className='material-icons'>keyboard_arrow_down</i>
        </div>
      </div>
    );
  }
}

export default AdminStats;
