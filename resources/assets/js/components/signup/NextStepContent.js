import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { verifyPassword } from '../../actions/signup/signupContactActions';
import { confirmSignup } from '../../actions/signup/signupActions';
import PasswordInput from './forms/PasswordInput';

const mapStateToProps = (state) => {
  return {
    currentPrimaryContact: state.signupReducer.currentPrimaryContact
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    verifyPassword: (password) => dispatch(verifyPassword(password)),
    confirmSignup: () => dispatch(confirmSignup())
  };
};

class NextStepContent extends Component {
  constructor(props) {
      super(props);

      this.state = {
        showSuccessContent: false
      };
  }

  componentWillMount() {
    this.props.confirmSignup();
    if (!this.props.contactExists) {
      window.location = `/register?email=${this.props.currentPrimaryContact.email_address}`;
    } else if (!this.props.currentUser) {
      window.location = '/login';
    }
  }

  render() {
    const component = this.getContent();
    return (
      <div>
        {component}
      </div>
    );
  }

  getContent() {
    if (this.props.contactExists && !this.state.showSuccessContent) {
      return (
        <PasswordInput
          verifyPassword={this.props.verifyPassword}
          showSuccessContent={() => { this.setState({ showSuccessContent: true }); }}
        />
      );
    } else if (this.state.showSuccessContent) {
      return (
        <div>
          <div>
            Looks like you are all set up!
            You can now access <a href='/admin'>your dashboard!</a>
          </div>
        </div>
      );
    }

    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NextStepContent);
