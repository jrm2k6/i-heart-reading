import React, { Component } from 'react';
import RegisterSchoolForm from './forms/RegisterSchoolForm';

class RegisterSchoolComponent extends Component {
  render() {
    return (
      <div className='register-school-container'>
        <div className='section-header'>
          What school do you represent?
        </div>
        <div className='section-form'>
          <RegisterSchoolForm />
        </div>
      </div>
    );
  }
}

export default RegisterSchoolComponent;
