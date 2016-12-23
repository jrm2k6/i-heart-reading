import React, { Component } from 'react';

export default class ListItemGroup extends Component {
  render() {
    return (
      <div>
        {this.props.group.name}
      </div>
    );
  }
}
