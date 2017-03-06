import React, { Component } from 'react';

class RegisterSchoolForm extends Component {
  render() {
    return (
      <div className='register-school-form'>
        <div className='signup-form-input-wrapper'>
          <span className='signup-form-label'>Name of School</span>
          <input className='signup-form-input'
            onChange={this.props.updateNameSchool}
          />
        </div>
        <div className='signup-form-input-wrapper'>
          <span className='signup-form-label'>Address School</span>
          <input className='signup-form-input'
            onChange={this.props.updateAddressSchool}
          />
        </div>
        <div className='signup-form-input-wrapper'>
          <span className='signup-form-label'>Domain name for email address school</span>
          <input className='signup-form-input'
            placeholder="@myschooldomain.com"
            onChange={this.props.updateDomainEmailSchool}
          />
        </div>
      </div>
    );
  }
}


export default RegisterSchoolForm;
