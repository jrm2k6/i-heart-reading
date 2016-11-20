import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { verifyContact } from '../../actions/signup/signupContactActions';
import VerifyingUserMessage from './VerifyingUserMessage';
import NextStepContent from './NextStepContent';

class VerificationComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      verifyingUser: true
    };
  }

  componentDidMount() {
    // Get contact created and check if we have it as a user already
    // Otherwise, redirect to signup verification -> get request -> returns laravel view for signup
    // and redirect to last page of signup after that.
    // Create verification email
    // Done

    if (this.props.currentPrimaryContact !== null) {
      this.props.verifyContact().then(
        res => { this.setState({ verifyingUser: false }); }
      );
    } else {
      console.log('still waiting for contact');
    }
  }

  render() {
    const content = (this.state.verifyingUser) ?
      <VerifyingUserMessage /> :
      <NextStepContent
        contactExists={this.props.contactExists}
        currentUser={this.props.currentUser}
      />
    return (
      <div className='register-school-container'>
        <div className='section-header'>
          One more step..
        </div>
        <div className='section-form'>
          {content}
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    currentPrimaryContact: state.signupReducer.currentPrimaryContact,
    currentUser: state.userProfileReducer.user,
    contactExists: state.signupReducer.contactExists
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    verifyContact: () => dispatch(verifyContact())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(VerificationComponent);
