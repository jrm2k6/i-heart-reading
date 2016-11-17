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
        <input onChange={(e) => { this.setState({ password: e.target.value }); }}
      </div>
    );
  }
}

export default PasswordInput;
