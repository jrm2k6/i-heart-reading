import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    teachers: state.adminReducer.teachers,
    groups: state.adminReducer.groups
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};


class TransferGroupToNewTeacherForm extends Component {
  constructor(props) {
      super(props);

      this.state = {
        groupId: null,
        selectedTeacherId: null
      };

      this.updateSelectedGroup = this.updateSelectedGroup.bind(this);
      this.updateSelectedTeacher = this.updateSelectedTeacher.bind(this);
      this.handleValidateTransfer = this.handleValidateTransfer.bind(this);
  }

  render() {
    return (
      <div className='admin-add-admin-form'>
        <span>Select a group</span>
        <div className='admin-select-wrapper'>
          <span className='admin-select-arrow'>
            <i className='material-icons'>keyboard_arrow_down</i>
          </span>
          {this.getGroups()}
        </div>
        {this.getTeachers()}
        <div className='explanation'>
          You are about to transfer the group to that teacher
        </div>
        <button className='admin-form-submit-btn'
          onClick={this.handleValidateTransfer}
        >
          Assign group to teacher
        </button>
      </div>
    );
  }

  handleValidateTransfer() {
  }

  updateSelectedGroup(e) {
    this.setState({ groupId: e.target.value });
  }

  updateSelectedTeacher(e) {
    this.setState({ selectedTeacherId: e.target.value });
  }

  getGroups() {
    const groups = (this.props.onlyGroup) ?
      this.props.groups.filter(group => group.teacher_id !== this.props.teacher.id && group.teacher_id !== null)
      : this.props.groups.filter(group => group.teacher_id === this.props.teacher.id && group.teacher_id !== null)

    return (
      <select className='admin-form-select'
        onChange={this.updateSelectedGroup}
      >
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
        <span>Select a teacher</span>
        <div className='admin-select-wrapper'>
          <span className='admin-select-arrow'>
            <i className='material-icons'>keyboard_arrow_down</i>
          </span>
          <select className='admin-form-select'
            onChange={this.updateSelectedTeacher}
          >
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
