import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();


class SignupComponent extends Component {
  render() {
    return (
      <div className='root-component'>
        {this.props.children}
      </div>
    );
  }
}

export default SignupComponent;
