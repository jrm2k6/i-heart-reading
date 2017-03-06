import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListItemAdmin from './ListItemAdmin';
import { deleteAdmin } from '../../actions/admin/adminDashboardActions';

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAdmin: (userId) => {
      dispatch(deleteAdmin(userId));
    }
  };
};

class ListAdmins extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  render() {
    return (
      <div className='admin-list-container'>
        <div className='admin-list-header'>
          <span>Name</span>
          <span className='add-new-btn' onClick={this.props.onAddAdmin}>Add</span>
        </div>
        <div>
          {this.props.admins.map((admin) => (
            <ListItemAdmin admin={admin} key={admin.id}
              handleDelete={this.handleDelete}
            />
          ))}
        </div>
      </div>
    );
  }

  handleDelete(userId) {
    this.props.deleteAdmin(userId);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListAdmins);
