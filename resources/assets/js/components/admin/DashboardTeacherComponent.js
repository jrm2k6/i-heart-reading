import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddTeacherForm from './forms/AddTeacherForm';
import ListTeachers from './ListTeachers';
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
      showingList: true
    };

    this.handleValidate = this.handleValidate.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  render() {
    const component = (this.state.showingList) ? this.getTeacherList() : this.getTeacherForm();
    return component;
  }

  getTeacherForm() {
    return (
      <AddTeacherForm
        admins={this.props.admins}
        handleValidate={this.handleValidate}
        handleCancel={this.handleCancel}
      />
    );
  }

  getTeacherList() {
    return (
      <ListTeachers
        teachers={this.props.teachers}
        onAddTeacher={() => { this.setState({ showingList: false }); }}
      />
    );
  }

  handleValidate(data) {
    this.props.createTeacher(data);
  }

  handleCancel() {
    this.setState({ showingList: true });
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardTeacherComponent);
