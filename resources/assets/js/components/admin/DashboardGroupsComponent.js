import React, { Component } from 'react';
import { connect } from 'react-redux';
import GroupCreationForm from '../signup/forms/GroupCreationForm';
import ListGroups from './ListGroups';
import { createGroup } from '../../actions/admin/adminDashboardActions';

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createGroup: ({ name, grade, nickname, teacherId }) => {
      dispatch(createGroup({ name, grade, nickname, teacherId }));
    }
  };
};

class DashboardGroupsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingList: true
    };

    this.handleValidate = this.handleValidate.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  render() {
    const component = (this.state.showingList) ?
      <ListGroups
        groups={this.props.groups}
        onAddGroup={() => { this.setState({ showingList: false }); }}
      /> :
      <GroupCreationForm
        handleValidate={this.handleValidate}
        handleCancel={this.handleCancel}
        shouldShowTeachersDropdown={{true}}
        className='admin-group-creation-form'
      />

    return component;
  }

  handleValidate(data) {
    this.props.createGroup(data);
  }

  handleCancel() {
    this.setState({ showingList: true });
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardGroupsComponent);
