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
    createGroup: ({ name, grade, nickname }) => {
      dispatch(createGroup({ name, grade, nickname }));
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
  }

  render() {
    const component = (this.state.showingList) ?
      <ListGroups groups={this.props.groups} /> :
      <GroupCreationForm handleValidate={this.handleValidate} />
    return (
      <div>
        {component}
      </div>
    );
  }

  handleValidate(data) {
    this.props.createGroup(data);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardGroupsComponent);
