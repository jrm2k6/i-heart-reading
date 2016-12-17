import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddTeacherForm from './forms/AddTeacherForm';
import { createTeacher } from '../../actions/admin/adminDashboardActions';

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTeacher: ({ name, email, password, user_id }) => {
      dispatch(createTeacher({ name, email, password, user_id }));
    }
  };
};

class DashboardTeacherComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingList: false
    };

    this.handleValidate = this.handleValidate.bind(this);
  }

  render() {
    const component = (this.state.showingList) ?
      <div>List Teachers</div> :
      <AddTeacherForm
        admins={this.props.admins}
        handleValidate={this.handleValidate}
      />
    return (
      <div>
        {component}
      </div>
    );
  }

  handleValidate(data) {
    this.props.createTeacher(data);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardTeacherComponent);
