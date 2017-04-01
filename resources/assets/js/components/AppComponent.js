import React, { Component } from 'react';
import { fetchUser } from '../actions/userProfileActions';
import { hideModal } from '../actions/modals/modalActions';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import LateralMenu from './LateralMenu';
import AlertsComponent from './AlertsComponent';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const mapStateToProps = (state) => {
  return {
    user: state.userProfileReducer.user,
    currentTypeAlert: state.alertsReducer.currentTypeAlert,
    currentContentAlert: state.alertsReducer.currentContentAlert,
    modalComponent: state.modalReducer.component,
    modalData: state.modalReducer.data,
    showingModal: state.modalReducer.showingModal
  };
};

const overrideModalDefaultStyles = () => {
  Modal.defaultStyles.overlay.backgroundColor = "rgba(0, 0, 0, 0.85)";
  Modal.defaultStyles.content.width = "60%";
  Modal.defaultStyles.content.height = "60%";
  Modal.defaultStyles.content.top = "0";
  Modal.defaultStyles.content.bottom = "0";
  Modal.defaultStyles.content.left = "0";
  Modal.defaultStyles.content.right = "0";
  Modal.defaultStyles.content.margin = "auto";
  Modal.defaultStyles.content.padding = "0";
  Modal.defaultStyles.content.borderRadius = "1px";
  Modal.defaultStyles.content.border = "none";
}

overrideModalDefaultStyles();


const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => {
      dispatch(fetchUser());
    },

    hideModal: () => {
      dispatch(hideModal());
    }
  };
};

class AppComponent extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { currentTypeAlert, currentContentAlert,
      showingModal, modalComponent, modalData
    } = this.props;

    const alert = (currentTypeAlert && currentContentAlert) ?
      <AlertsComponent type={currentTypeAlert} content={currentContentAlert} /> :
        null;

    const element = (showingModal && modalComponent) ?
      React.createElement(modalComponent, modalData) : null;

    return (
        <div className='root-component'>
            {alert}
            <LateralMenu history={this.props.history} user={this.props.user} />
            <div className='interactive-panel'>
                {this.props.children}
            </div>
            <Modal
              contentLabel={'Application Modal'}
              isOpen={showingModal}
              onRequestClose={this.props.hideModal}
            >
              {element}
            </Modal>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
