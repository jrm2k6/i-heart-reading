import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createGroupTransfer } from '../../../actions/admin/adminDashboardActions';

const mapStateToProps = (state) => {
  return {
    teachers: state.adminReducer.teachers,
    groups: state.adminReducer.groups
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    transferGroupTo: (groupId, teacherId) => {
      dispatch(createGroupTransfer(groupId, teacherId));
    }
  };
};


class TransferGroupToNewTeacherForm extends Component {
  constructor(props) {
      super(props);

      this.state = {
        groupId: -1,
        selectedTeacherId: -1
      };

      this.updateSelectedGroup = this.updateSelectedGroup.bind(this);
      this.updateSelectedTeacher = this.updateSelectedTeacher.bind(this);
      this.handleValidateTransfer = this.handleValidateTransfer.bind(this);
  }

  render() {
    return (
      <div className='admin-add-admin-form'>
        <div className='admin-select-wrapper'>
          <span className='admin-select-arrow'>
            <i className='material-icons'>keyboard_arrow_down</i>
          </span>
          {this.getGroups()}
        </div>
        {this.getTeachers()}
        <button className='admin-form-submit-btn'
          onClick={this.handleValidateTransfer}
        >
          Assign group to teacher
        </button>
      </div>
    );
  }

  handleValidateTransfer() {
    const { onlyGroup, teacher } = this.props;
    const teacherId = (onlyGroup) ? teacher.id : this.state.selectedTeacherId;

    if (this.state.groupId === -1 || (!onlyGroup && teacherId === -1)) {
      // TODO: show alerts error or fix disabled state
      console.log('Please select something');
    } else {
      this.props.transferGroupTo(this.state.groupId, teacherId);
    }
  }

  updateSelectedGroup(e) {
    const selectedId = e.target.value;
    this.setState({ groupId: parseInt(selectedId, 10) });
  }

  updateSelectedTeacher(e) {
    const selectedId = e.target.value;
    this.setState({ selectedTeacherId: parseInt(selectedId, 10) });
  }

  getGroups() {
    const groups = (this.props.onlyGroup) ?
      this.props.groups.filter(group => group.teacher_id !== this.props.teacher.id && group.teacher_id !== null)
      : this.props.groups.filter(group => group.teacher_id === this.props.teacher.id && group.teacher_id !== null)

    return (
      <select className='admin-form-select'
        value={this.state.groupId}
        onChange={this.updateSelectedGroup}
      >
        <option value={-1} key={0} className='disabled-option'>Select a group</option>
        { groups.map((group) =>
          <option value={group.id} key={group.id}>{group.name}</option>
        )}
      </select>
    );
  }

  getTeachers() {
    const teachers = this.props.teachers.filter(teacher => teacher.id !== this.props.teacher.id);
    if (this.props.onlyGroup) {
      return null;
    }

    return (
      <div>
        <div className='admin-select-wrapper'>
          <span className='admin-select-arrow'>
            <i className='material-icons'>keyboard_arrow_down</i>
          </span>
          <select className='admin-form-select'
            value={this.state.selectedTeacherId}
            onChange={this.updateSelectedTeacher}
          >
            <option value={-1} key={0} className='disabled-option'>Select a teacher</option>
            {teachers.map((teacher) =>
              <option value={teacher.id} key={teacher.id}>{teacher.user.name}</option>
            )}
          </select>
        </div>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TransferGroupToNewTeacherForm);
