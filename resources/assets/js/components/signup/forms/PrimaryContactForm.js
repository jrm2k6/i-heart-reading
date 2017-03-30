import React, { Component } from 'react';

class PrimaryContactForm extends Component {
  render() {
    const {
      namePrimaryContact,
      rolePrimaryContact,
      emailAddressPrimaryContact,
      updateNamePrimaryContact,
      updateEmailAddressPrimaryContact,
      updateRolePrimaryContact
    } = this.props;

    return (
      <div className='register-school-form'>
        <div className='signup-form-input-wrapper'>
          <span className='signup-form-label'>Name of Primary contact</span>
          <input className='signup-form-input'
            onChange={updateNamePrimaryContact}
            placeholder={namePrimaryContact}
          />
        </div>
        <div className='signup-form-input-wrapper'>
          <span className='signup-form-label'>Email address of contact</span>
          <input className='signup-form-input'
            onChange={updateEmailAddressPrimaryContact}
            placeholder={emailAddressPrimaryContact}
          />
        </div>
        <div className='signup-form-input-wrapper'>
          <span className='signup-form-label'>Role</span>
          <input className='signup-form-input'
            onChange={updateRolePrimaryContact}
            placeholder={rolePrimaryContact}
          />
        </div>
      </div>
    );
  }
}

export default PrimaryContactForm;
