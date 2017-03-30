import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import PrimaryContactForm from './forms/PrimaryContactForm';
import { createContact, updateContact,
  ERROR_CONTACT_CREATED, ERROR_CONTACT_UPDATED
} from '../../actions/signup/signupContactActions';


const mapStateToProps = (state) => {
  return {
    currentPrimaryContact: state.signupReducer.currentPrimaryContact,
    currentSchool: state.signupReducer.currentSchool
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createOrUpdateContact: (data, shouldUpdate) => {
      if (shouldUpdate) {
        return dispatch(updateContact(data))
      }

      return dispatch(createContact(data));
    }
  };
};

class PrimaryContactComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      namePrimaryContact: null,
      rolePrimaryContact: null,
      emailAddressPrimaryContact: null,
      currentError: null,
      shouldShowError: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { currentPrimaryContact } = this.props;
    if (currentPrimaryContact) {
      this.setState({
        namePrimaryContact: currentPrimaryContact.name,
        emailAddressPrimaryContact: currentPrimaryContact.email_address,
        rolePrimaryContact: currentPrimaryContact.role,
      });
    }
  }

  render() {
    const errorContainer = (this.state.shouldShowError) ? (
      <div className='error-container'>
        {this.state.currentError}
      </div>
    ) : null

    return (
      <div className='register-school-primary-contact-container'>
        <div className='section-header'>
          Who is the primary contact?
        </div>
        {errorContainer}
        <div className='section-form'>
          <PrimaryContactForm
            namePrimaryContact={this.state.namePrimaryContact}
            rolePrimaryContact={this.state.rolePrimaryContact}
            emailAddressPrimaryContact={this.state.emailAddressPrimaryContact}
            updateNamePrimaryContact={(e) => { this.setState({ namePrimaryContact: e.target.value }); }}
            updateRolePrimaryContact={(e) => { this.setState({ rolePrimaryContact: e.target.value }); }}
            updateEmailAddressPrimaryContact={(e) => {
              this.setState({ emailAddressPrimaryContact: e.target.value });
            }}
          />
        </div>
        <div className='section-navigation'>
          <button className='section-navigation-btn previous-btn'
            onClick={this.handlePreviousClick}>
            Previous
          </button>
          <button className='section-navigation-btn next-btn'
            onClick={this.handleClick}>
            Next
          </button>
        </div>
      </div>
    );
  }

  isFailedRequest(res) {
    return res.type === ERROR_CONTACT_CREATED || res.type === ERROR_CONTACT_UPDATED;
  }

  getCurrentError(res) {
    let currentError = null;
    if (res.data !== null) {
      const data = res.data;
      const keys = Object.keys(data);

      if (keys.length > 0) {
        const firstKey = keys[0];
        const firstError = data[firstKey];

        if (firstError.length > 0) {
          currentError = firstError[0];
        }
      }
    }

    return currentError;
  }

  handleClick() {
    const { namePrimaryContact, emailAddressPrimaryContact, rolePrimaryContact } = this.state;
    const { currentSchool, currentPrimaryContact} = this.props;
    const isValid = namePrimaryContact !== null
      && emailAddressPrimaryContact !== null
      && rolePrimaryContact !== null;

    if (currentSchool) {
      const schoolData = Object.assign({}, this.state, {
        schoolId: this.props.currentSchool.id
      });

      if (isValid) {
        const shouldUpdate = (currentPrimaryContact !== null);
        const data = (shouldUpdate) ? Object.assign({}, schoolData, {id: currentPrimaryContact.id}) : schoolData;
        this.props.createOrUpdateContact(data, shouldUpdate).then(
          res => {
            if (this.isFailedRequest(res)) {
              this.setState({
                shouldShowError: true,
                currentError: this.getCurrentError(res)
              });
            } else {
              this.setState({
                shouldShowError: false,
                currentError: null
              }, () => { browserHistory.push('/signup/classrooms'); });
            }
          }
        );
      } else {
        console.log("error");
      }
    }
  }

  handlePreviousClick() {
    browserHistory.push('/signup')
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryContactComponent);
