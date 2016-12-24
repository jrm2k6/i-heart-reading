import React, { Component } from 'react';
import ListItemAdmin from './ListItemAdmin';

export default class ListAdmins extends Component {
  render() {
    return (
      <div className='admin-list-container'>
        <div className='admin-list-header'>
          <span>Name</span>
          <span className='add-new-btn' onClick={this.props.onAddAdmin}>Add</span>
        </div>
        <div>
          {this.props.admins.map((admin) => (
            <ListItemAdmin admin={admin} key={admin.id}/>
          ))}
        </div>
      </div>
    );
  }
}
