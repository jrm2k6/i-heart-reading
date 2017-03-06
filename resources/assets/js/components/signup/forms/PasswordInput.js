import React, { Component } from 'react';

class PasswordInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: null
    };

    this.handleVerifyPassword = this.handleVerifyPassword.bind(this);
  }

  render() {
    return (
      <div>
        <span>Enter your password, please!</span>
        <input type='password' onChange={(e) => { this.setState({ password: e.target.value }); }} />
        <button onClick={this.handleVerifyPassword}>
          Validate
        </button>
      </div>
    );
  }

  handleVerifyPassword() {
    this.props.verifyPassword(this.state.password).then(
      res => {
        this.props.showSuccessContent();
      },

      err => {
        // make sure there is a redirect after login
        window.location = '/login';
      }
    )
  }
}

export default PasswordInput;
