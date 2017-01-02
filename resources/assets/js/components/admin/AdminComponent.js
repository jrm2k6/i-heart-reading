import React, { Component } from 'react';
import LateralMenu from './LateralMenu';
import Modal from 'react-modal';
import UpdateTeacherModal from './modals/UpdateTeacherModal';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { fetchUser } from '../../actions/userProfileActions';
import { hideModal } from '../../actions/modals/modalActions';
import { connect } from 'react-redux';

injectTapEventPlugin();

const mapStateToProps = (state) => {
  return {
    user: state.userProfileReducer.user,
    modalComponent: state.modalReducer.component,
    modalData: state.modalReducer.data,
    showingModal: state.modalReducer.showingModal
  };
};

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


class AdminComponent extends Component {
  render() {
    const { showingModal, modalComponent, modalData } = this.props;
    const element = (showingModal && modalComponent) ?
      React.createElement(modalComponent, modalData) : null;
    return (
      <div className='root-component'>
          <LateralMenu history={this.props.history} user={this.props.user} />
          <div className='interactive-panel'>
            {this.props.children}
          </div>
          <Modal
            isOpen={showingModal}
            onRequestClose={this.props.hideModal}
          >
            {element}
          </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminComponent);
