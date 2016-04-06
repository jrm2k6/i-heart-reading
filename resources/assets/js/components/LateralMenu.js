import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class LateralMenu extends Component {
  constructor(props) {
    super(props);
    this.currentSelectedItem = null;
  }

  handleClickMenu(e) {
    switch (e.target.innerText) {
      case 'Home':
        browserHistory.push('/app/books');
        break;
      case 'Find a Book':
        browserHistory.push('/app/books/add');
        break;
      default:
        browserHistory.push('/app');
        break;
    }
  }

  render() {
    return (
      <div className='lateral-menu'>
        <Menu onItemTouchTap={this.handleClickMenu}>
          <MenuItem primaryText='Home' />
          <MenuItem primaryText='Find a Book' />
        </Menu>
      </div>
    );
  }
}
