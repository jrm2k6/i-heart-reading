import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAdminUser } from '../../actions/admin/adminProfileActions';

import TeacherStats from './TeacherStats';
import AdminStats from './AdminStats';
import GroupStats from './GroupStats';
import ReadOnlyInput from './forms/ReadOnlyInput';

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
    const studentToken = (school !== null) ? school.tokens.find(token => token.type === 'student').token : null;
    const adminToken = (school !== null) ? school.tokens.find(token => token.type === 'admin').token : null;

    const studentTokenUrl = (studentToken !== null) ? `${window.location.origin}/signup/students/${studentToken}` : 'Loading..';
    const adminTokenUrl = (adminToken !== null) ? `${window.location.origin}/signup/staff/${adminToken}` : `Loading..`;
    const studentTokenTitle = `Signup URL Students`;
    const adminsTokenTitle = `Signup URL Staff Members`;
    const additionalClassName = (componentToShow !== null) ? 'stick-to-top' : 'centered';
    const additionalClassNameTokensContainer = (componentToShow !== null) ? 'invisible' : 'visible';
    const additionalClassNameDynamicContent = (componentToShow !== null) ? 'non-empty' : 'empty';
    const containerSquareClassName = `home-container-squares ${additionalClassName}`;
    const dynamicContentClassName = `home-container-dynamic-content ${additionalClassNameDynamicContent}`;

    const classNameForTokensContainer = `tokens-container ${additionalClassNameTokensContainer}`;
    return (
      <div className='home-container'>
        <div className={classNameForTokensContainer}>
          <ReadOnlyInput title={studentTokenTitle}  content={studentTokenUrl} />
          <ReadOnlyInput title={adminsTokenTitle}  content={adminTokenUrl} />
        </div>
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
        <div className={dynamicContentClassName}>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminHomeComponent);
