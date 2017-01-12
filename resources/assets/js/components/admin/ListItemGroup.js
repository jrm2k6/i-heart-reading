import React, { Component } from 'react';
import { connect } from 'react-redux';

import { showModal } from '../../actions/modals/modalActions';
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
    const { name, nickname, grade, teacher } = this.props.group;
    const teacherContent = (teacher != null) ? teacher.user.name : 'No Teacher Assigned';

    const listItemOptions = (this.state.hovering) ? (
      <div className='admin-list-item-option'>
        <i className='material-icons admin-list-item-option-edit-icon'
          onClick={() => { this.props.showModal(UpdateGroupModal, { group: this.props.group, groups: this.props.groups }); }}
        >
          edit
        </i>
        <i className='material-icons admin-list-item-option-delete-icon'>
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
        <span>{teacherContent}</span>
        {listItemOptions}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItemGroup);
