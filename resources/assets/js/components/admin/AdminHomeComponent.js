import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAdminUser } from '../../actions/admin/adminProfileActions';


class AdminHomeComponent extends Component {
  componentDidMount() {
    this.props.fetchAdminUser();
  }

  render() {
    return (
      <div>
        Home Component
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    adminUser: state.adminReducer.adminUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAdminUser: () => dispatch(fetchAdminUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHomeComponent);
