import React, { Component } from 'react';

class GroupCreationForm extends Component {
  constructor(props) {
      super(props);

      this.state = {
        name: null,
        grade: null,
        nickname: null
      };

      this.updateGroupName = this.updateGroupName.bind(this);
      this.updateGrade = this.updateGrade.bind(this);
      this.updateNickname = this.updateNickname.bind(this);
      this.handleCreate = this.handleCreate.bind(this);
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className='form-input-group'>
          <div className='form-input-label'>Name</div>
          <div>
            <input className='form-input'
              onChange={this.updateGroupName}
            />
          </div>
        </div>
        <div>
          <div className='form-input-label'>Grade/Type</div>
          <div className='admin-select-wrapper'>
            <span className='admin-select-arrow'>
              <i className='material-icons'>keyboard_arrow_down</i>
            </span>
            <select className='admin-form-select'
              onChange={this.updateGrade}
            >
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
        <div className='form-input-group'>
          <div className='form-input-label'>Nickname</div>
          <div>
            <input className='form-input'
              onChange={this.updateNickname}
            />
          </div>
        </div>
        <button className='admin-form-submit-btn'
          onClick={this.handleCreate}
        >
          Create
        </button>
      </div>
    );
  }

  handleCreate() {
    this.props.handleValidate(this.state);
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
  className: 'register-school-form'
}
export default GroupCreationForm;
