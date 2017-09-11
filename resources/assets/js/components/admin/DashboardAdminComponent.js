import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddAdminForm from './forms/AddAdminForm';
import ListAdmins from './ListAdmins';
import { createAdmin } from '../../actions/admin/adminDashboardActions';

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createAdmin: ({ name, email, password, user_id }) => {
      dispatch(createAdmin({ name, email, password, user_id }));
    }
  };
};

class DashboardAdminComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingList: true
    };

    this.handleValidate = this.handleValidate.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  render() {
    const component = (this.state.showingList) ?
      <ListAdmins
        admins={this.props.admins}
        onAddAdmin={() => { this.setState({ showingList: false }); }}
      /> :
      <AddAdminForm
        handleValidate={this.handleValidate}
        handleCancel={this.handleCancel}
        teachers={this.props.teachers}
      />

    return component;
  }

  handleValidate(data) {
    this.props.createAdmin(data);
  }

  handleCancel() {
    this.setState({ showingList: true });
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAdminComponent);
