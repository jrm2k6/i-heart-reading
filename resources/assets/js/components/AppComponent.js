import React, { Component } from 'react';
import { fetchUser } from '../actions/userProfileActions';
import { connect } from 'react-redux';
import LateralMenu from './LateralMenu';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const mapStateToProps = (state) => {
  return {
    books: state.userProfileReducer.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => {
      dispatch(fetchUser());
    }
  };
};

export default class AppComponent extends Component {
  render() {
    return (
        <div className='root-component'>
            <LateralMenu history={this.props.history} />
            <div className='interactive-panel'>
                {this.props.children}
            </div>
        </div>
    );
  }

  componentDidMount() {
    this.props.fetchUser();
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
