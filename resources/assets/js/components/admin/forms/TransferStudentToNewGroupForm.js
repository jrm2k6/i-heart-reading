import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStudentsTransfer } from '../../../actions/admin/adminDashboardActions';

const mapStateToProps = (state) => {
  return {
    groups: state.adminReducer.groups
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    transferStudentsToGroup: (groupId, studentIds) => {
      dispatch(createStudentsTransfer(groupId, studentIds));
    }
  };
};


class TransferStudentToNewGroupForm extends Component {
  constructor(props) {
      super(props);

      this.state = {
        groupId: -1,
        selectedStudentId: -1
      };

      this.updateSelectedGroup = this.updateSelectedGroup.bind(this);
      this.updateSelectedStudent = this.updateSelectedStudent.bind(this);
      this.handleValidateTransfer = this.handleValidateTransfer.bind(this);
  }

  render() {
    return (
      <div className='admin-add-admin-form'>
        {this.getStudentsPicker()}
        {this.getGroups()}
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

  updateSelectedStudents(e) {
    const selectedStudentId = e.target.value;
    this.setState({ selectedStudents: this.state.selectedStudents.concat(parseInt(selectedStudentId, 10)) });
  }

  getGroups() {
  }

  getStudentsPicker() {
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TransferStudentToNewGroupForm);
