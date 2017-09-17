import React, { Component } from 'react';
import { connect } from 'react-redux';

import { showModal } from '../../actions/modals/modalActions';
import { deleteGroup, archiveGroup } from '../../actions/admin/adminDashboardActions';
import UpdateGroupModal from './modals/UpdateGroupModal';


const mapStateToProps = (state) => {
  return {
    groups: state.adminReducer.groups
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showModal: (component, data) => {
      dispatch(showModal(component, data));
    },

    deleteGroup: (id) => {
      dispatch(deleteGroup(id));
    },

    archiveGroup: (id) => {
      dispatch(archiveGroup(id));
    }
  };
};

class ListItemGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false
    };
  }

  render() {
    const { id, name, nickname, grade, teacher, students } = this.props.group;
    const teacherContent = (teacher != null) ? teacher.user.name : 'No Teacher Assigned';

    const listItemOptions = (this.state.hovering) ? (
      <div className='admin-list-item-option'>
        <i className='material-icons admin-list-item-option-edit-icon'
          onClick={() => { this.props.showModal(UpdateGroupModal, { group: this.props.group, groups: this.props.groups }); }}
        >
          edit
        </i>
        <i className='material-icons admin-list-item-option-archive-icon'
          onClick={() => { this.props.archiveGroup(id); }}
        >
          archive
        </i>
        <i className='material-icons admin-list-item-option-delete-icon'
          onClick={() => { this.props.deleteGroup(id); }}
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
        <span>{name} ({nickname})</span>
        <span>{grade}</span>
        <span>{students.length}</span>
        <span>{teacherContent}</span>
        {listItemOptions}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItemGroup);
