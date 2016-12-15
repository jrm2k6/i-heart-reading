import React, { Component } from 'react';
import DashboardAdminComponent from './DashboardAdminComponent';

class AdminStats extends Component {
  constructor(props) {
      super(props);
      this.state = {
        showingDashboard: false
      };
  }

  render() {
    console.log(this.props);
    return (
      <div className='stats-container-item'>
        <div>{this.props.admins.length} admins</div>
        <div className='stats-container-item-expand'
          onClick={() => { if (!this.state.showingDashboard) {
            this.props.showComponent(<DashboardAdminComponent />);
            this.setState({ showingDashboard: true }); }}
          }
        >
          <i className='material-icons'>keyboard_arrow_down</i>
        </div>
      </div>
    );
  }
}

export default AdminStats;
