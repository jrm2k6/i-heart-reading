import React, { Component } from 'react';
import { connect } from 'react-redux';

import { showModal } from '../../actions/modals/modalActions';
import { deleteTeacher } from '../../actions/admin/adminDashboardActions';
import UpdateTeacherModal from './modals/UpdateTeacherModal';

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showModal: (component, data) => {
      dispatch(showModal(component, data));
    },
    deleteTeacher: (id) => {
      dispatch(deleteTeacher(id));
    }
  };
};


class ListItemTeacher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false
    };
  }

  render() {
    const listItemOptions = (this.state.hovering) ? (
      <div className='admin-list-item-option'>
        <i className='material-icons admin-list-item-option-edit-icon'
          onClick={() => { this.props.showModal(UpdateTeacherModal, {teacher: this.props.teacher}); }}
        >
          edit
        </i>
        <i className='material-icons admin-list-item-option-delete-icon'
          onClick={() => { this.props.deleteTeacher(this.props.teacher.id); }}
        >
          delete
        </i>
      </div>
    ) : null;

    return (
      <div className='admin-list-item'
        onMouseEnter={() => { this.setState({ hovering: true })}}
        onMouseLeave={() => { this.setState({ hovering: false })}}
      >
        <span>{this.props.teacher.user.name}</span>
        <span>{this.props.teacher.num_groups}</span>
        {listItemOptions}
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ListItemTeacher)
