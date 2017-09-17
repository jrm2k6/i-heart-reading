import React, { Component } from 'react';

class ListItemArchivedGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false
    };
  }

  render() {
    const { id, name, nickname, grade, teacher, students } = this.props.group;
    const teacherContent = (teacher != null) ? teacher.user.name : 'No Teacher Assigned';

    const listItemOptions = (this.state.hovering) ? (
      <div className='admin-list-item-option'>
        <i className='material-icons admin-list-item-option-archive-icon'
          onClick={() => { this.props.unarchiveGroup(id); }}
        >
          unarchive
        </i>
      </div>
    ) : null;

    return (
      <div className='admin-list-item'
        onMouseEnter={() => { this.setState({ hovering: true })}}
        onMouseLeave={() => { this.setState({ hovering: false })}}
      >
        <span>{name} ({nickname})</span>
        <span>{grade}</span>
        <span>{students.length}</span>
        <span>{teacherContent}</span>
        {listItemOptions}
      </div>
    );
  }
}

export default ListItemArchivedGroup;
