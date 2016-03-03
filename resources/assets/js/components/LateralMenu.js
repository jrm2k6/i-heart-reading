import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class LateralMenu extends Component {
  constructor(props) {
    super(props);
    this.currentSelectedItem = null;
  }

  render() {
    return (
      <div className='lateral-menu'>
        <Menu onItemTouchTap={this.handleClickMenu.bind(this)}>
          <MenuItem primaryText="Find a Book" />
        </Menu>
      </div>
    );
  }

  handleClickMenu(e) {
    browserHistory.replace('/app/books/add');
  }
}
