import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import PasswordInput from './forms/PasswordInput';

class NextStepContent extends Component {
  componentWillMount() {
    if (!this.props.contactExists) {
      window.location = '/register';
    }
  }

  render() {
    const component = (this.props.contactExists) ?
      <PasswordInput /> : null;
    return (
      <div>
        {component}
      </div>
    );
  }
}

export default NextStepContent;
