import React, { Component } from 'react';
import LateralMenu from './LateralMenu';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

export default class AppComponent extends Component {
    render() {
      return (
          <div className='root-component'>
              <LateralMenu history={this.props.history} />
              <div className='interactive-panel'>
                  {this.props.children}
              </div>
          </div>
      );
    }
}
