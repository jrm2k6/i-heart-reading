import React from 'react';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class LateralMenu extends React.Component {
  constructor(props) {
      super(props);
      this.currentSelectedItem = null;
  }

  render() {
    return (
      <div className='lateral-menu'>
        <Menu onItemTouchTap={this.handleClickMenu.bind(this)}>
          <MenuItem primaryText="Add a Book"/>
        </Menu>
      </div>
    )
  }

  handleClickMenu(e) {
    console.log('click', e.target.textContent);
  }
}
