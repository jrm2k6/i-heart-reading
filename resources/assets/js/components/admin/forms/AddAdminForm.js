import React, { Component } from 'react';

class AddAdminForm extends Component {
  constructor(props) {
      super(props);

      // get list current teachers from that school
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
        <div>
          <span>Teacher</span>
          <select onChange={this.updateSelectedTeacher}>
            {this.props.teachers.map((teacher) =>
              <option value={teacher.id} key={teacher.id}>{teacher.user.name}</option>
            )}
          </select>
        </div>
        <div>
          <button onClick={this.handleCreate}>Make Admin</button>
        </div>
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
