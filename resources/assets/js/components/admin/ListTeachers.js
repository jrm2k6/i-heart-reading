import React, { Component } from 'react';
import ListItemTeacher from './ListItemTeacher';

export default class ListTeachers extends Component {
  render() {
    return (
      <div className='admin-list-container'>
        <div className='admin-list-header'>
          <span>Name</span>
          <span># Groups</span>
          <span className='add-new-btn' onClick={this.props.onAddTeacher}>Add</span>
        </div>
        <div>
          {this.props.teachers.map((teacher) => (
            <ListItemTeacher teacher={teacher} key={teacher.id}/>
          ))}
        </div>
      </div>
    );
  }
}
