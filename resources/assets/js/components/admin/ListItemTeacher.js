import React, { Component } from 'react';

export default class ListItemTeacher extends Component {
  render() {
    return (
      <div>
        {this.props.teacher.user.name}
      </div>
    );
  }
}
