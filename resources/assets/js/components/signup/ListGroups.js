import React, { Component } from 'react';

class ListGroups extends Component {
  render() {
    const { groups } = this.props;
    if (groups.length > 0) {
      return (
        <div className='signup-list-groups'>
          <div className='signup-list-groups-header'>
            <span>Name</span>
            <span>Grade</span>
            <span>Nickname</span>
          </div>
          {groups.map((group, i) => (
            <div className='signup-list-groups-item' key={i}>
              <span>{group.name}</span>
              <span>{group.grade}</span>
              <span>{group.nickname}</span>
              <div className='group-item-delete' onClick={() => { this.props.deleteGroup(i); }}>
                <i className='material-icons group-item-delete-icon'>
                  delete
                </i>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return null;
  }
}

export default ListGroups;
