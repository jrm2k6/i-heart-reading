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
      componentToShow: null,
      nameComponent: null
    };
  }

  componentDidMount() {
    this.props.fetchAdminUser();
  }

  render() {
    const { componentToShow, nameComponent } = this.state;
    const { teachers, admins, school, users, groups } = this.props;
    const additionalClassName = (componentToShow !== null) ? 'stick-to-top' : 'centered';
    const containerSquareClassName = `home-container-squares ${additionalClassName}`;
    return (
      <div className='home-container'>
        <div className={containerSquareClassName}>
          <TeacherStats teachers={teachers}
            admins={admins}
            school={school}
            showComponent={(component) => { this.setState({ componentToShow: component, nameComponent: 'teachers' }); }}
            closeComponent={() => { this.setState({ componentToShow: null, nameComponent: null }); }}
            showingComponent={nameComponent === 'teachers'}
            className={this.getClassName('teachers')}
          />
          <AdminStats
            teachers={teachers}
            admins={admins}
            school={school}
            showComponent={(component) => { this.setState({ componentToShow: component, nameComponent: 'admins' }); }}
            closeComponent={() => { this.setState({ componentToShow: null, nameComponent: null }); }}
            showingComponent={nameComponent === 'admins'}
            className={this.getClassName('admins')}
          />
          <GroupStats
            teachers={teachers}
            school={school}
            groups={groups}
            user={users}
            showComponent={(component) => { this.setState({ componentToShow: component, nameComponent: 'groups' }); }}
            closeComponent={() => { this.setState({ componentToShow: null, nameComponent: null }); }}
            showingComponent={nameComponent === 'groups'}
            className={this.getClassName('groups')}
          />
        </div>
        <div className='home-container-dynamic-content'>
          {componentToShow}
        </div>
      </div>
    );
  }

  getClassName(nameComponent) {
    if (this.state.componentToShow === null) {
      return 'visible-list';
    }

    if (this.state.nameComponent === nameComponent) {
      return 'visible';
    }

    return 'invisible';
  }
}

const mapStateToProps = (state) => {
  return {
    adminUser: state.adminReducer.adminUser,
    teachers: state.adminReducer.teachers,
    admins: state.adminReducer.admins,
    school: state.adminReducer.school,
    groups: state.adminReducer.groups,
    users: state.adminReducer.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAdminUser: () => dispatch(fetchAdminUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHomeComponent);
