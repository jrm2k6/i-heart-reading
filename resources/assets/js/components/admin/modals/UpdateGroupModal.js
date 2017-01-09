import React, { Component } from 'react';
import StudentsPicker from '../forms/StudentsPicker';

export default class UpdateGroupModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingGroupsOptions: true,
      selectedOption: null
    };
  }

  render() {
    const { group } = this.props;
    const content = (this.state.showingGroupsOptions) ? (
      <div>
        <StudentsPicker {...this.props} />
      </div>
    ) : null;

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
}
