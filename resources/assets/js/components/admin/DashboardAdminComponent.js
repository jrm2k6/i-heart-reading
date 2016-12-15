import React, { Component } from 'react';
import AddAdminForm from './forms/AddTeacherForm';

class DashboardAdminComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingList: true
    };
  }

  render() {
    const component = (this.state.showingList) ? <div>List Admins</div> : <AddAdminForm />
    return (
      <div>
        {component}
      </div>
    );
  }
}

export default DashboardAdminComponent;
