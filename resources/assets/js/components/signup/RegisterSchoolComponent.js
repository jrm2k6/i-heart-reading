import React, { Component } from 'react';
import RegisterSchoolForm from './forms/RegisterSchoolForm';
import { browserHistory } from 'react-router';

class RegisterSchoolComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameSchool: null,
      addressSchool: null,
      domainNameSchool: null
    };

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <div className='register-school-container'>
        <div className='section-header'>
          What school do you represent?
        </div>
        <div className='section-form'>
          <RegisterSchoolForm
            updateNameSchool={(e) => { this.setState({ nameSchool: e.target.value }); }}
            updateAddressSchool={(e) => { this.setState({ addressSchool: e.target.value }); }}
            updateDomainEmailSchool={(e) => { this.setState({ domainNameSchool: e.target.value }); }}
          />
        </div>
        <div className='section-navigation'>
          <button>Previous</button>
          <button onClick={this.handleClick}>Next</button>
        </div>
      </div>
    );
  }

  handleClick() {
    const { nameSchool, addressSchool, domainNameSchool } = this.state;
    const isValid = nameSchool !== null && addressSchool !== null && domainNameSchool !== null;

    if (isValid) {
      console.log("submit the shit");
    } else {
      console.log("error");
    }
    browserHistory.push('signup/contact');
  }
}

export default RegisterSchoolComponent;
