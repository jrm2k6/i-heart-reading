import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudentsPicker from '../forms/StudentsPicker';

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

class UpdateGroupModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingGroupsOptions: true,
      selectedOption: 'transfer-to-me',
      selectedStudents: [],
      selectedGroup: -1
    };

    this.handleValidateTransfer = this.handleValidateTransfer.bind(this);
    this.updateSelectedGroup = this.updateSelectedGroup.bind(this);
  }

  render() {
    const { group } = this.props;
    const groupPicker = (this.state.selectedOption === 'transfer-to-other') ? this.getGroups() : null;

    const content = (
      <div>
        <span>{group.id} - { group.name}</span>
        {this.getRadioButtons()}
        <StudentsPicker {...this.props}
          sendSelectedStudents={(students) => { this.setState({ selectedStudents: students }); }}
          onlyCurrentGroup={this.state.selectedOption !== 'transfer-to-me'}
        />
        {groupPicker}
        <button className='admin-form-submit-btn'
          onClick={this.handleValidateTransfer}
        >
          Transfer Students
        </button>
      </div>
    );

    return (
      <div className='update-group'>
        <div className='update-group-header'>
        </div>
        <div className='update-group-content'>
          {content}
        </div>
      </div>
    );
  }

  getRadioButtons() {
    const { teacher } = this.props;
    return (
      <div className='update-group-manage-groups-options'>
        <div class='checkbox'>
          <input className='ihr-checkbox'
            type='radio'
            name='transfer-to-me'
            id='transfer-to-me'
            value='transfer-to-me'
            checked={'transfer-to-me' == this.state.selectedOption}
            onChange={() => { this.setState({ selectedOption: 'transfer-to-me' }); }}
          />
          <label forName='transfer-to-me'><span></span>Assign new students to this group</label>
        </div>
        <div class='checkbox'>
          <input className='ihr-checkbox'
            type='radio'
            name='transfer-to-other'
            id='transfer-to-other'
            value='transfer-to-other'
            checked={'transfer-to-other' == this.state.selectedOption}
            onChange={() => { this.setState({ selectedOption: 'transfer-to-other' }); }}
          />
          <label forName='transfer-to-me'><span></span>Assign students from this group to another group</label>
        </div>
      </div>
    );
  }

  getGroups() {
    const groups = this.props.groups.filter(group => group.id !== this.props.group.id);

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

  updateSelectedGroup(e) {
    this.setState({ selectedGroup: e.target.value });
  }

  handleValidateTransfer() {
    const groupId = (this.state.selectedOption === 'transfer-to-me') ?
      this.props.group.id : this.state.selectedGroup;

    if (groupId !== -1) {
      const selectedStudents = this.state.selectedStudents.map(student => student.value);
      this.props.transferStudentsToGroup(groupId, selectedStudents);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateGroupModal);
