import React, { Component } from 'react';

class PrimaryContactForm extends Component {
  render() {
    return (
      <div className='register-school-form'>
        <div className='signup-form-input-wrapper'>
          <span className='signup-form-label'>Name of Primary contact</span>
          <input className='signup-form-input'
            onChange={this.props.updateNamePrimaryContact}
          />
        </div>
        <div className='signup-form-input-wrapper'>
          <span className='signup-form-label'>Email address of contact</span>
          <input className='signup-form-input'
          onChange={this.props.updateEmailAddressPrimaryContact}
          />
        </div>
        <div className='signup-form-input-wrapper'>
          <span className='signup-form-label'>Role</span>
          <input className='signup-form-input'
            onChange={this.props.updateRolePrimaryContact}
          />
        </div>
      </div>
    );
  }
}

export default PrimaryContactForm;
