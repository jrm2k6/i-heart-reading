import React, { Component } from 'react';
import TeachersDropdown from '../../admin/forms/TeachersDropdown';

class GroupCreationForm extends Component {
  constructor(props) {
      super(props);

      this.state = {
        name: null,
        grade: null,
        nickname: null,
        teacherId: null
      };

      this.updateGroupName = this.updateGroupName.bind(this);
      this.updateGrade = this.updateGrade.bind(this);
      this.updateNickname = this.updateNickname.bind(this);
      this.handleCreate = this.handleCreate.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className='signup-form-input-wrapper'>
          <span className='signup-form-label'>Name</span>
          <input className='form-input'
            onChange={this.updateGroupName}
          />
        </div>
        <div>
          <span className='signup-form-label'>Grade/Type</span>
          <div className='admin-select-wrapper'>
            <span className='admin-select-arrow'>
              <i className='material-icons'>keyboard_arrow_down</i>
            </span>
            <select className='admin-form-select'
              onChange={this.updateGrade}
            >
              <option>Select a grade</option>
              <option>K1</option>
              <option>K2</option>
              <option>K3</option>
              <option>K4</option>
              <option>K5</option>
              <option>K6</option>
              <option>K7</option>
              <option>K8</option>
              <option>K9</option>
              <option>K10</option>
              <option>K11</option>
              <option>K12</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        {this.getTeacherDropdown()}
        <div className='signup-form-input-wrapper'>
          <span className='signup-form-label'>Nickname</span>
          <input className='form-input'
            onChange={this.updateNickname}
          />
        </div>
        <div className='admin-form-btns-wrapper'>
          <button className='admin-form-submit-btn'
            onClick={this.handleCreate}
          >
            Create
          </button>
          <button className='admin-form-submit-btn cancel-btn'
            onClick={this.handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  getTeacherDropdown() {
    if (this.props.shouldShowTeachersDropdown) {
      return (
        <TeachersDropdown notifyParentForm={teacherId => { this.setState({ teacherId }); }}/>
      );
    }

    return null;
  }

  handleCreate() {
    this.props.handleValidate(this.state);
  }

  handleCancel() {
    this.props.handleCancel();
  }


  updateGroupName(e) {
    this.setState({ name: e.target.value });
  }

  updateGrade(e) {
    this.setState({ grade: e.target.value });
  }

  updateNickname(e) {
    this.setState({ nickname: e.target.value });
  }
}

GroupCreationForm.defaultProps = {
  className: 'register-school-form',
  shouldShowTeachersDropdown: false
}

export default GroupCreationForm;
