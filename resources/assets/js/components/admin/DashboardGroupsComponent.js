import React, { Component } from 'react';
import { connect } from 'react-redux';
import GroupCreationForm from '../signup/forms/GroupCreationForm';
import { ListGroups, ListArchivedGroups } from './ListGroups';
import { createGroup, unarchiveGroup, fetchGroups } from '../../actions/admin/adminDashboardActions';

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createGroup: ({ name, grade, nickname, teacherId }) => {
      dispatch(createGroup({ name, grade, nickname, teacherId }));
    },
    unarchiveGroup: groupId => dispatch(unarchiveGroup(groupId)),
    fetchGroups: () => {
      dispatch(fetchGroups());
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
    this.handleUnarchiveGroup = this.handleUnarchiveGroup.bind(this);
  }

  render() {
    const component = (this.state.showingList) ?
      <div style={{flex: 1}}>
        <ListGroups
          groups={this.props.groups}
          onAddGroup={() => { this.setState({ showingList: false }); }}
        />
        {this.getArchivedGroups()}
      </div>
      :
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

  handleUnarchiveGroup(groupId) {
    this.props.unarchiveGroup(groupId).then(
      res => this.props.fetchGroups(),
      err => { console.log('error resfreshing groups'); }
    );
  }

  getArchivedGroups() {
    if (this.props.archivedGroups.length > 0) {
      return (
        <ListArchivedGroups
          archivedGroups={this.props.archivedGroups}
          unarchiveGroup={this.handleUnarchiveGroup}
        />
      );
    }

    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardGroupsComponent);
