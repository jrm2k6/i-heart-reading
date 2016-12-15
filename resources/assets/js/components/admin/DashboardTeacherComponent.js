import React, { Component } from 'react';
import AddTeacherForm from './forms/AddTeacherForm';

class DashboardTeacherComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingList: true
    };
  }

  render() {
    const component = (this.state.showingList) ? <div>List Teachers</div> : <AddTeacherForm />
    return (
      <div>
        {component}
      </div>
    );
  }
}

export default DashboardTeacherComponent;
