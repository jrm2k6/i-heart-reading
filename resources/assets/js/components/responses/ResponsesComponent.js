import React, { Component } from 'react';

class ResponsesComponent extends Component {
  render() {
    return (
        <div>
          {this.props.children}
        </div>
    );
  }
}

export default ResponsesComponent;
