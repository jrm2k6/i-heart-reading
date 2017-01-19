import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();


class SignupComponent extends Component {
  render() {
    return (
      <div className='signup-root-component'>
        <div className='signup-header'>
            <div className='logo-container'>
                <img src='/images/logos/i-heart-reading-logo.png' />
            </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default SignupComponent;
