import React, { Component } from 'react';
import GroupCreationForm from '../signup/forms/GroupCreationForm';

class DashboardGroupsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingList: true
    };
  }

  render() {
    const component = (this.state.showingList) ? <div>List Groups</div> : <GroupCreationForm />
    return (
      <div>
        {component}
      </div>
    );
  }
}

export default DashboardGroupsComponent;
