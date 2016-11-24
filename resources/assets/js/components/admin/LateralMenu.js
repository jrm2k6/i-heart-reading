import React, { Component } from 'react';
import { browserHistory } from 'react-router';

export default class LateralMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: null,
      randomBackgroundColor: this.getRandomColor()
    };
  }

  getRandomColor() {
    return `rgb(${this.getRandomInt(1, 256)}, ${this.getRandomInt(1, 256)}, ${this.getRandomInt(1, 256)})`;
  }
  getClassnameItem(name) {
    let className = 'menu-item';

    if (this.state.activeTab === name) {
      className += ' active';
    }

    return className;
  }


  handleClickMenu(tabName) {
    switch (tabName) {
      case 'home':
        browserHistory.push('/admin');
        break;

      case 'logout':
        window.location.replace('/logout');
        break;

      default:
        browserHistory.push('/admin');
        break;
    }

    this.setState({ activeTab: tabName });
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  render() {
    const { user } = this.props;
    let name = null;
    let role = null;
    let firstLetter = null;

    if (user) {
      name = user.name;
      role = user.role.charAt(0).toUpperCase() + user.role.slice(1);
      firstLetter = user.name.charAt(0);
    }

    return (
      <div className='ihr-lateral-menu'>
        <div className='logo-container'>
          <img src='/images/logos/i-heart-reading-logo.png' />
        </div>
        <div className='profile-container'>
          <div className='profile-avatar'>
            <div className='profile' style={{ backgroundColor: this.state.randomBackgroundColor }}>
              {firstLetter}
            </div>
          </div>
          <div className='profile-short-description'>
            <span className='profile-name'>{name}</span>
            <span className='profile-title'>{role}</span>
          </div>
        </div>
        <div className='menu-container' >
          <div className={this.getClassnameItem('home')}
            onClick={() => { this.handleClickMenu('home');}}
          >
            <i className='material-icons'>home</i><span>Home</span>
          </div>
          <div className={this.getClassnameItem('logout')}
            onClick={() => { this.handleClickMenu('logout');}}
          >
            <i className='material-icons'>exit_to_app</i><span>Log Out</span>
          </div>
          <div className='separator-container'>
            <hr className='separator' />
          </div>
        </div>
      </div>
    );
  }
}
