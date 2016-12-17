import React, { Component } from 'react';

class AddTeacherForm extends Component {
  constructor(props) {
      super(props);
      // get list current admins from that school
      this.state = {
        name: null,
        email: null,
        temporaryPassword: Math.random().toString(36).substring(7),
        selectedAdminId: null
      };

      this.updateName = this.updateName.bind(this);
      this.updateEmail = this.updateEmail.bind(this);
      this.handleCreate = this.handleCreate.bind(this);
      this.updateSelectedAdmin = this.updateSelectedAdmin.bind(this);
  }

  render() {
    return (
      <div className='admin-add-teacher-form'>
        <span>Teacher</span>
        <select onChange={this.updateSelectedAdmin}>
          {this.props.admins.map((admin) =>
            <option value={admin.user.id} key={admin.id}>{admin.user.name}</option>
          )}
        </select>
        <div>
          <button onClick={this.handleCreate}>Make Teacher</button>
        </div>
      </div>
    );
  }

  handleCreate() {
    const { name, email, temporaryPassword, selectedAdminId } = this.state;
    this.props.handleValidate({ name, email, password: temporaryPassword, user_id: selectedAdminId });
  }

  updateName(e) {
    this.setState({ name: e.target.value });
  }

  updateEmail(e) {
    this.setState({ email: e.target.value });
  }

  updateSelectedAdmin(e) {
    this.setState({ selectedAdminId: e.target.value });
  }
}


export default AddTeacherForm;
