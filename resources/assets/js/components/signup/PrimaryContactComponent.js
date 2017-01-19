import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import PrimaryContactForm from './forms/PrimaryContactForm';
import { createContact } from '../../actions/signup/signupContactActions';

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
        </div>
        <div className='section-navigation'>
          <button className='section-navigation-btn previous-btn'>Previous</button>
          <button className='section-navigation-btn next-btn'
            onClick={this.handleClick}>
            Next
          </button>
        </div>
      </div>
    );
  }

  handleClick() {
    const { namePrimaryContact, emailAddressPrimaryContact, rolePrimaryContact } = this.state;
    const isValid = namePrimaryContact !== null
      && emailAddressPrimaryContact !== null
      && rolePrimaryContact !== null;
    if (this.props.currentSchool) {
      const schoolData = Object.assign({}, this.state, {
        schoolId: this.props.currentSchool.id
      });
      if (isValid) {
        this.props.createContact(schoolData).then(
          res => { browserHistory.push('/signup/classrooms') }
        );
      } else {
        console.log("error");
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentSchool: state.signupReducer.currentSchool
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createContact: (data) => dispatch(createContact(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryContactComponent);
