import React, { Component } from 'react';
import ListItemGroup from './ListItemGroup';
import ListItemArchivedGroup from './ListItemArchivedGroup';

export class ListGroups extends Component {
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
          {this.props.groups.filter(group => group.id > 0).map((group) => (
            <ListItemGroup group={group} key={group.id}/>
          ))}
        </div>
      </div>
    );
  }
}

export class ListArchivedGroups extends Component {
  render() {
    return (
      <div className='admin-list-container'>
        <div className='admin-list-header admin-groups-archived'>
          <span>Name</span>
          <span>Grade</span>
          <span># Students</span>
          <span>Teacher</span>
        </div>
        <div>
          {this.props.archivedGroups.map((group) => (
            <ListItemArchivedGroup
              key={group.id}
              group={group}
              unarchiveGroup={this.props.unarchiveGroup}
            />
          ))}
        </div>
      </div>
    );
  }
}
