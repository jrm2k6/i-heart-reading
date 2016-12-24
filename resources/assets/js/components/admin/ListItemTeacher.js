import React, { Component } from 'react';

export default class ListItemTeacher extends Component {
  render() {
    return (
      <div className='admin-list-item'>
        <span>{this.props.teacher.user.name}</span>
        <span>{this.props.teacher.num_groups}</span>
      </div>
    );
  }
}
