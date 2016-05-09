import React, { Component } from 'react';
import { browserHistory } from 'react-router';

export default class LateralMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: null
    };
  }

  getClassnameItem(name) {
    let className = 'menu-item';

    if (this.state.activeTab === name) {
      className += ' active';
    }

    return className;
  }

  getTeacherOptions() {
    const { user } = this.props;

    if (user && user.role === 'teacher') {
      return (
        <div className={this.getClassnameItem('responses')}
          onClick={() => { this.handleClickMenu('responses');}}
        >
          <i className='material-icons'>assignment_turned_in</i><span>Responses</span>
        </div>
      );
    }

    return null;
  }

  handleClickMenu(tabName) {
    switch (tabName) {
      case 'home':
        browserHistory.push('/app');
        break;

      case 'books':
        browserHistory.push('/app/books');
        break;

      case 'search':
        browserHistory.push('/app/books/add');
        break;

      case 'responses':
        browserHistory.push('/app/responses');
        break;

      case 'logout':
        browserHistory.push('/logout');
        break;

      default:
        browserHistory.push('/app');
        break;
    }

    this.setState({ activeTab: tabName });
  }

  render() {
    const options = this.getTeacherOptions();

    return (
      <div className='ihr-lateral-menu'>
        <div className='logo-container'>
          <img src='/images/logos/i-heart-reading-logo.png' />
        </div>
        <div className='profile-container'>
          <div className='profile-avatar'>
            <img src='/images/icons/people.png' />
          </div>
          <div className='profile-short-description'>
            <span className='profile-name'>Jeremy Dagorn</span>
            <span className='profile-title'>Student/Teacher</span>
          </div>
        </div>
        <div className='menu-container' >
          <div className={this.getClassnameItem('home')}
            onClick={() => { this.handleClickMenu('home');}}
          >
            <i className='material-icons'>home</i><span>Home</span>
          </div>
          <div className={this.getClassnameItem('books')}
            onClick={() => { this.handleClickMenu('books');}}
          >
            <i className='material-icons'>library_books</i><span>My Books</span>
          </div>
          <div className={this.getClassnameItem('search')}
            onClick={() => { this.handleClickMenu('search');}}
          >
            <i className='material-icons'>search</i><span>Find A Book</span>
          </div>
          {options}
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
