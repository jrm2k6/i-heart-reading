import React, { Component } from 'react';

class RegisterSchoolForm extends Component {
  render() {
    return (
      <div className='register-school-form'>
        <div>
          <span>Name of School</span>
          <input onChange={this.props.updateNameSchool}/>
        </div>
        <div>
          <span>Address School</span>
          <input onChange={this.props.updateAddressSchool}/>
        </div>
        <div>
          <span>Domain name for email address school</span>
          <input onChange={this.props.updateDomainEmailSchool}/>
        </div>
      </div>
    );
  }
}


export default RegisterSchoolForm;
