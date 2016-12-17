import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddAdminForm from './forms/AddAdminForm';
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
      showingList: false
    };

    this.handleValidate = this.handleValidate.bind(this);
  }

  render() {
    const component = (this.state.showingList) ?
      <div>List Admins</div> :
      <AddAdminForm
        handleValidate={this.handleValidate}
        teachers={this.props.teachers}
      />
    return (
      <div>
        {component}
      </div>
    );
  }

  handleValidate(data) {
    this.props.createAdmin(data);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAdminComponent);
