import React, { Component } from 'react';

export default class ListItemAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false
    };
  }

  render() {
    const listItemOptions = (this.state.hovering) ? (
      <div className='admin-list-item-option'>
        <i className='material-icons admin-list-item-option-delete-icon'
          onClick={() => { this.props.handleDelete(this.props.admin.id); }}
        >
          delete
        </i>
      </div>
    ) : null;
    return (
      <div className='admin-list-item'
        onMouseEnter={() => { this.setState({ hovering: true })}}
        onMouseLeave={() => { this.setState({ hovering: false })}}
      >
        {this.props.admin.user.name}
        {listItemOptions}
      </div>
    );
  }
}
