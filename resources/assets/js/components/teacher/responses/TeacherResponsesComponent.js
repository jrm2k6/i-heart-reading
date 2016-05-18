import React, { Component } from 'react';

class TeacherResponsesComponent extends Component {
  render() {
    return (
        <div style={{ flex: 1 }}>
          {this.props.children}
        </div>
    );
  }
}

export default TeacherResponsesComponent;
