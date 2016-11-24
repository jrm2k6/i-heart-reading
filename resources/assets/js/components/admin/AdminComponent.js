import React, { Component } from 'react';
import LateralMenu from './LateralMenu';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { fetchUser } from '../../actions/userProfileActions';
import { connect } from 'react-redux';

injectTapEventPlugin();

const mapStateToProps = (state) => {
  return {
    user: state.userProfileReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => {
      dispatch(fetchUser());
    }
  };
};


class AdminComponent extends Component {
  render() {
    return (
      <div className='root-component'>
          <LateralMenu history={this.props.history} user={this.props.user} />
          <div className='interactive-panel'>
            {this.props.children}
          </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminComponent);
