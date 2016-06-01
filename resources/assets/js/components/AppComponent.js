import React, { Component } from 'react';
import { fetchUser } from '../actions/userProfileActions';
import { connect } from 'react-redux';
import LateralMenu from './LateralMenu';
import AlertsComponent from './AlertsComponent';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const mapStateToProps = (state) => {
  return {
    user: state.userProfileReducer.user,
    currentTypeAlert: state.alertsReducer.currentTypeAlert,
    currentContentAlert: state.alertsReducer.currentContentAlert
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => {
      dispatch(fetchUser());
    }
  };
};

class AppComponent extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { currentTypeAlert, currentContentAlert } = this.props;
    const alert = (currentTypeAlert && currentContentAlert) ?
      <AlertsComponent type={currentTypeAlert} content={currentContentAlert} /> :
        null;
    return (
        <div className='root-component'>
            {alert}
            <LateralMenu history={this.props.history} user={this.props.user} />
            <div className='interactive-panel'>
                {this.props.children}
            </div>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
