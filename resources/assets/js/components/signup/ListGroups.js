import React, { Component } from 'react';

class ListGroups extends Component {
  render() {
    return (
      <div>
        {this.props.groups.map((group, i) => (
          <div key={i}>
            <span>{group.name}</span>
            <span>{group.grade}</span>
            <span>{group.nickname}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default ListGroups;
