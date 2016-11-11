import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import PrimaryContactForm from './forms/PrimaryContactForm';

class PrimaryContactComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      namePrimaryContact: null,
      rolePrimaryContact: null,
      emailAddressPrimaryContact: null
    };

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <div className='register-school-primary-contact-container'>
        <div className='section-header'>
          Who is the primary contact?
        </div>
        <div className='section-form'>
          <PrimaryContactForm
            updateNamePrimaryContact={(e) => { this.setState({ namePrimaryContact: e.target.value }); }}
            updateRolePrimaryContact={(e) => { this.setState({ rolePrimaryContact: e.target.value }); }}
            updateEmailAddressPrimaryContact={(e) => {
              this.setState({ emailAddressPrimaryContact: e.target.value });
            }}
          />
          <div className='section-navigation'>
            <button>Previous</button>
            <button onClick={this.handleClick}>Next</button>
          </div>
        </div>
      </div>
    );
  }

  handleClick() {
    const { namePrimaryContact, emailAddressPrimaryContact, rolePrimaryContact } = this.state;
    const isValid = namePrimaryContact !== null
      && emailAddressPrimaryContact !== null
      && rolePrimaryContact !== null;

    if (isValid) {
      console.log("submit the shit");
    } else {
      console.log("error");
    }
    browserHistory.push('signup/classrooms');
  }
}

export default PrimaryContactComponent;
