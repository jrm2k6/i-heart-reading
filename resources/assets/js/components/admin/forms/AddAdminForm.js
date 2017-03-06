import React, { Component } from 'react';

class AddAdminForm extends Component {
  constructor(props) {
      super(props);

      this.state = {
        name: null,
        email: null,
        temporaryPassword: Math.random().toString(36).substring(2, 13),
        selectedTeacherId: null
      };

      this.updateName = this.updateName.bind(this);
      this.updateSelectedTeacher = this.updateSelectedTeacher.bind(this);
      this.updateEmail = this.updateEmail.bind(this);
      this.handleCreate = this.handleCreate.bind(this);
  }

  render() {
    return (
      <div className='admin-add-admin-form'>
          <div className='explanation'>
            You can make any member of your staff an admin.
          </div>
          <div className='admin-select-wrapper'>
            <span className='admin-select-arrow'>
              <i className='material-icons'>keyboard_arrow_down</i>
            </span>
            <select className='admin-form-select'
              onChange={this.updateSelectedTeacher}
            >
              {this.props.teachers.map((teacher) =>
                <option value={teacher.id} key={teacher.id}>{teacher.user.name}</option>
              )}
            </select>
        </div>
        <button className='admin-form-submit-btn'
          onClick={this.handleCreate}
        >
          Make Admin
        </button>
      </div>
    );
  }

  handleCreate() {
    const { name, email, temporaryPassword, selectedTeacherId } = this.state;
    this.props.handleValidate({ name, email, password: temporaryPassword, user_id: selectedTeacherId });
  }

  updateName(e) {
    this.setState({ name: e.target.value });
  }

  updateEmail(e) {
    this.setState({ email: e.target.value });
  }

  updateSelectedTeacher(e) {
    this.setState({ selectedTeacherId: e.target.value });
  }
}


export default AddAdminForm;
