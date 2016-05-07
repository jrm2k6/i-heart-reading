import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class LateralMenu extends Component {
  getTeacherOptions() {
    const { user } = this.props;

    if (user && user.role === 'teacher') {
      return (
        <MenuItem primaryText='Responses' />
      );
    }

    return null;
  }

  handleClickMenu(e) {
    switch (e.target.innerText) {
      case 'Home':
        browserHistory.push('/app');
        break;

      case 'My Books':
        browserHistory.push('/app/books');
        break;

      case 'Find a Book':
        browserHistory.push('/app/books/add');
        break;

      case 'Responses':
        browserHistory.push('/app/responses');
        break;

      default:
        browserHistory.push('/app');
        break;
    }
  }

  render() {
    const options = this.getTeacherOptions();

    return (
      <div className='lateral-menu'>
        <Menu onItemTouchTap={this.handleClickMenu}>
          <MenuItem primaryText='Home' />
          <MenuItem primaryText='My Books' />
          <MenuItem primaryText='Find a Book' />
          {options}
        </Menu>
      </div>
    );
  }
}
