import React, { Component } from 'react';

class PrimaryContactForm extends Component {
  render() {
    return (
      <div className='register-school-form'>
        <span>Name of Primary contact</span>
        <input onChange={this.props.updateNamePrimaryContact}/>
        <span>Email address of contact</span>
        <input onChange={this.props.updateEmailAddressPrimaryContact} />
        <span>Role</span>
        <input onChange={this.props.updateRolePrimaryContact} />
      </div>
    );
  }
}

export default PrimaryContactForm;
