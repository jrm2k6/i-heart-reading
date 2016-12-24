import React, { Component } from 'react';

export default class ListItemGroup extends Component {
  render() {
    const { name, nickname, grade, teacher } = this.props.group;
    const teacherContent = (teacher != null) ? teacher.user.name : 'No Teacher Assigned';

    return (
      <div className='admin-list-item'>
        <span>{name} ({nickname})</span>
        <span>{grade}</span>
        <span>{teacherContent}</span>
      </div>
    );
  }
}
