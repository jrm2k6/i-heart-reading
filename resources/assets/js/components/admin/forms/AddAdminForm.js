import React, { Component } from 'react';

class AddAdminForm extends Component {
  constructor(props) {
      super(props);


      // get list current teachers from that school
      this.state = {
        name: null,
        email: null,
        temporaryPassword: Math.random().toString(36).substring(7)
      };

      this.updateName = this.updateName.bind(this);
      this.updateEmail = this.updateEmail.bind(this);
      this.handleCreate = this.handleCreate.bind(this);
  }

  render() {
    return (
      <div className='admin-add-admin-form'>
        <div>
          <span>Name</span>
          <input onChange={this.updateName} />
        </div>
        <div>
          <span>Email</span>
          <input onChange={this.updateEmail} />
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

  updateName(e) {
    this.setState({ name: e.target.value });
  }

  updateEmail(e) {
    this.setState({ email: e.target.value });
  }
}


export default AddAdminForm;
