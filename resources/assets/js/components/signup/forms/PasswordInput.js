import React, { Component } from 'react';

class PasswordInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: null
    };
  }

  render() {
    return (
      <div>
        <span>Enter your password, please!</span>
        <input onChange={(e) => { this.setState({ password: e.target.value }); }} />
        <button onClick={ () => { this.props.verifyPassword(this.state.password)}}>
          Validate
        </button>
      </div>
    );
  }
}

export default PasswordInput;
