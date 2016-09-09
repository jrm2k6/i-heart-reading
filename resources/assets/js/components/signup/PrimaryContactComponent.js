import React, { Component } from 'react';
import PrimaryContactForm from './forms/PrimaryContactForm';

class PrimaryContactComponent extends Component {
  render() {
    return (
      <div className='register-school-primary-contact-container'>
        <div className='section-header'>
          Who is the primary contact?
        </div>
        <div className='section-form'>
          <PrimaryContactForm />
        </div>
      </div>
    );
  }
}

export default PrimaryContactComponent;
