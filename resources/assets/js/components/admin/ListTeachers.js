import React, { Component } from 'react';
import ListItemTeacher from './ListItemTeacher';

export default class ListTeachers extends Component {
  render() {
    return (
      <div>
        {this.props.teachers.map((teacher) => (
          <ListItemTeacher teacher={teacher} key={teacher.id}/>
        ))}
      </div>
    );
  }
}
