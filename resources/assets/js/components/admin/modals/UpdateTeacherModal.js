import React, { Component } from 'react';
import TransferGroupToNewTeacherForm from '../forms/TransferGroupToNewTeacherForm';

export default class UpdateTeacherModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingGroupsOptions: false,
      selectedOption: null
    };
  }

  render() {
    const { teacher } = this.props;
    const content = (this.state.showingGroupsOptions) ? (
      <div>
        {this.getRadioButtons()}
        {this.getTransferGroupComponent()}
      </div>
    ) : (
      <div>
        <div className='update-teacher-groups'>
          <div className='update-teacher-groups-top'>
            <div className='update-teacher-groups-left'></div>
              {teacher.groups.length} groups
            <div className='update-teacher-groups-right'></div>
          </div>
        </div>
        <div className='update-teacher-groups-bottom'>
          <button onClick={() => { this.setState({ showingGroupsOptions: true }); }}>
            Manage groups
          </button>
        </div>
      </div>
    );

    return (
      <div className='update-teacher'>
        <div className='update-teacher-header'>
          {teacher.user.name}
        </div>
        <div className='update-teacher-content'>
          {content}
        </div>
      </div>
    );
  }

  getRadioButtons() {
    const { teacher } = this.props;
    return (
      <div className='update-teacher-manage-groups-options'>
        <div class='checkbox'>
          <input className='ihr-checkbox'
            type='radio'
            name='transfer-to-me'
            id='transfer-to-me'
            value='transfer-to-me'
            checked={'transfer-to-me' == this.state.selectedOption}
            onChange={() => { this.setState({ selectedOption: 'transfer-to-me' }); }}
          />
          <label forName='transfer-to-me'><span></span>Assign a new group to {teacher.user.name}</label>
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
          <label forName='transfer-to-me'><span></span>Assign {teacher.user.name}s group to another teacher</label>
        </div>
      </div>
    );
  }

  getTransferGroupComponent() {
    if (this.state.selectedOption) {
      return (
        <TransferGroupToNewTeacherForm
          onlyGroup={this.state.selectedOption === 'transfer-to-me'}
          teacher={this.props.teacher}
        />
      );
    }

    return null;
  }

  getTeacherToFilterBy() {
    if (this.state.selectedOption === 'transfer-to-other') {
      return this.props.teacher;
    }

    return null;
  }
}
