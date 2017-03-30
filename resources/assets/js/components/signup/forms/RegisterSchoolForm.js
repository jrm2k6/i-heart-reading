import React, { Component } from 'react';

class RegisterSchoolForm extends Component {
  render() {
    const { nameSchool, addressSchool, domainNameSchool,
      updateNameSchool, updateAddressSchool, updateDomainEmailSchool
    } = this.props;

    const placeholder = (domainNameSchool !== null) ? domainNameSchool : 'myschooldomain.com';
    return (
      <div className='register-school-form'>
        <div className='signup-form-input-wrapper'>
          <span className='signup-form-label'>Name of School</span>
          <input className='signup-form-input'
            onChange={updateNameSchool}
            placeholder={nameSchool}
          />
        </div>
        <div className='signup-form-input-wrapper'>
          <span className='signup-form-label'>Address School</span>
          <input className='signup-form-input'
            onChange={updateAddressSchool}
            placeholder={addressSchool}
          />
        </div>
        <div className='signup-form-input-wrapper'>
          <span className='signup-form-label'>Domain name for email address school</span>
          <input className='signup-form-input'
            onChange={updateDomainEmailSchool}
            placeholder={placeholder}
          />
        </div>
      </div>
    );
  }
}


export default RegisterSchoolForm;
