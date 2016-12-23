import React, { Component } from 'react';

export default class ListItemAdmin extends Component {
  render() {
    return (
      <div>
        {this.props.admin.user.name}
      </div>
    );
  }
}
