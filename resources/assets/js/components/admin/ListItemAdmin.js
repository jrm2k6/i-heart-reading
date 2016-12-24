import React, { Component } from 'react';

export default class ListItemAdmin extends Component {
  render() {
    return (
      <div className='admin-list-item'>
        {this.props.admin.user.name}
      </div>
    );
  }
}
