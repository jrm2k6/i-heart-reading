import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAdminUser } from '../../actions/admin/adminProfileActions';

import TeacherStats from './TeacherStats';
import AdminStats from './AdminStats';
import GroupStats from './GroupStats';

class AdminHomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentToShow: null
    };
  }

  componentDidMount() {
    this.props.fetchAdminUser();
  }

  render() {
    return (
      <div className='home-container'>
        <TeacherStats teachers={this.props.teachers}
          admins={this.props.admins}
          school={this.props.school}
          showComponent={(component) => { this.setState({ componentToShow: component }); }}
        />
        <AdminStats
          teachers={this.props.teachers}
          admins={this.props.admins}
          school={this.props.school}
          showComponent={(component) => { this.setState({ componentToShow: component }); }}
        />
        <GroupStats
          teachers={this.props.teachers}
          school={this.props.school}
          groups={this.props.groups}
          showComponent={(component) => { this.setState({ componentToShow: component }); }}
        />
        <div>
          {this.state.componentToShow}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    adminUser: state.adminReducer.adminUser,
    teachers: state.adminReducer.teachers,
    admins: state.adminReducer.admins,
    school: state.adminReducer.school,
    groups: state.adminReducer.groups
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAdminUser: () => dispatch(fetchAdminUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHomeComponent);
