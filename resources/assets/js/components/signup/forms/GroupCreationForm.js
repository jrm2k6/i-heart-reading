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
      <div className='register-school-form'>
        <div>
          <span>Name</span>
          <input onChange={this.updateGroupName} />
        </div>
        <div>
          <span>Grade/Type</span>
          <select onChange={this.updateGrade}>
            <option>K1</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <span>Nickname</span>
          <input onChange={this.updateNickname} />
        </div>
        <div>
          <button onClick={this.handleCreate}>Create</button>
        </div>
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

export default GroupCreationForm;
