import React, { Component } from 'react';

class TeacherResponsesComponent extends Component {
  render() {
    return (
        <div>
          {this.props.children}
        </div>
    );
  }
}

export default TeacherResponsesComponent;
