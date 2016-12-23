import React, { Component } from 'react';
import ListItemGroup from './ListItemGroup';

export default class ListGroups extends Component {
  render() {
    return (
      <div>
        {this.props.groups.map((group) => (
          <ListItemGroup group={group} key={group.id}/>
        ))}
      </div>
    );
  }
}
