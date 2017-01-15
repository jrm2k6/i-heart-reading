import React, { Component } from 'react';
import ListItemGroup from './ListItemGroup';

export default class ListGroups extends Component {
  render() {
    return (
      <div className='admin-list-container'>
        <div className='admin-list-header'>
          <span>Name</span>
          <span>Grade</span>
          <span># Students</span>
          <span>Teacher</span>
          <span className='add-new-btn' onClick={this.props.onAddGroup}>Add</span>
        </div>
        <div>
          {this.props.groups.map((group) => (
            <ListItemGroup group={group} key={group.id}/>
          ))}
        </div>
      </div>
    );
  }
}
