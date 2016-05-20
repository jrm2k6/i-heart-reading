import React, { Component } from 'react';

class ResponsesComponent extends Component {
  render() {
    return (
        <div style={{ flex: 1 }}>
          {this.props.children}
        </div>
    );
  }
}

export default ResponsesComponent;
