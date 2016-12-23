import React, { Component } from 'react';
import ListItemAdmin from './ListItemAdmin';

export default class ListAdmins extends Component {
  render() {
    return (
      <div>
        {this.props.admins.map((admin) => (
          <ListItemAdmin admin={admin} key={admin.id}/>
        ))}
      </div>
    );
  }
}
