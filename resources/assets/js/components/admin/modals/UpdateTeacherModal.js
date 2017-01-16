import React, { Component } from 'react';
import TransferGroupToNewTeacherForm from '../forms/TransferGroupToNewTeacherForm';

export default class UpdateTeacherModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingGroupsOptions: true,
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
        <button onClick={() => { this.setState({ showingGroupsOptions: true }); }}>
          Manage groups
        </button>
      </div>
    );

    return (
      <div className='update-teacher'>
        <div className='update-teacher-header'>
          <div className='update-teacher-name'>{teacher.user.name}</div>
        </div>
        <div className='update-teacher-content'>
          {content}
        </div>
      </div>
    );
  }

  getRadioButtons() {
    const { teacher } = this.props;

    const contentLabelTransferToOther = `Assign one of ${teacher.user.name}'s groups to another teacher.`
    const contentLabelTransferToCurrentTeacher = `Assign a new group to ${teacher.user.name}.`;
    return (
      <div className='update-teacher-manage-groups-options'>
        <div className='ihr-radio-wrapper'
          onClick={() => { this.setState({ selectedOption: 'transfer-to-me' }); }}
        >
          <input className='ihr-radio'
            type='radio'
            name='transfer-to-me'
            id='transfer-to-me'
            value='transfer-to-me'
            checked={'transfer-to-me' == this.state.selectedOption}
          />
          <div className='ihr-check'></div>
          <label className='label-ihr' forName='transfer-to-me'>
            {contentLabelTransferToCurrentTeacher}
          </label>
        </div>
        <div className='ihr-radio-wrapper'
          onClick={() => { this.setState({ selectedOption: 'transfer-to-other' }); }}
        >
          <input className='ihr-radio'
            type='radio'
            name='transfer-to-other'
            id='transfer-to-other'
            value='transfer-to-other'
            checked={'transfer-to-other' == this.state.selectedOption}

          />
          <div className='ihr-check'></div>
          <label className='label-ihr' forName='transfer-to-me'>
            {contentLabelTransferToOther}
          </label>
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
