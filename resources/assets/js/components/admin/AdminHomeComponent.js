import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAdminUser } from '../../actions/admin/adminProfileActions';

import TeacherStats from './TeacherStats';
import AdminStats from './AdminStats';
import GroupStats from './GroupStats';
import ReadOnlyInput from './forms/ReadOnlyInput';

const mapStateToProps = (state) => {
  return state.adminReducer;
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
      ComponentToShow: null,
      nameComponent: null
    };
  }

  componentDidMount() {
    this.props.fetchAdminUser();
  }

  render() {
    const { ComponentToShow, nameComponent } = this.state;
    const { teachers, admins, school, users, groups, archivedGroups } = this.props;

    const studentToken = (school !== null && school.tokens !== null) ? school.tokens.find(token => token.type === 'student').token : null;
    const adminToken = (school !== null  && school.tokens !== null) ? school.tokens.find(token => token.type === 'admin').token : null;

    const studentTokenUrl = (studentToken !== null) ? `${window.location.origin}/signup/students/${studentToken}` : 'Loading..';
    const adminTokenUrl = (adminToken !== null) ? `${window.location.origin}/signup/staff/${adminToken}` : `Loading..`;
    const studentTokenTitle = `Signup URL Students`;
    const adminsTokenTitle = `Signup URL Staff Members`;
    const additionalClassName = (ComponentToShow !== null) ? 'stick-to-top' : 'centered';
    const additionalClassNameTokensContainer = (ComponentToShow !== null) ? 'invisible' : 'visible';
    const additionalClassNameDynamicContent = (ComponentToShow !== null) ? 'non-empty' : 'empty';
    const containerSquareClassName = `home-container-squares ${additionalClassName}`;
    const dynamicContentClassName = `home-container-dynamic-content ${additionalClassNameDynamicContent}`;

    const classNameForTokensContainer = `tokens-container ${additionalClassNameTokensContainer}`;

    const element = (ComponentToShow !== null) ? <ComponentToShow {...this.props} /> : null;

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
            showComponent={(component) => { this.setState({ ComponentToShow: component, nameComponent: 'teachers' }); }}
            closeComponent={() => { this.setState({ ComponentToShow: null, nameComponent: null }); }}
            showingComponent={nameComponent === 'teachers'}
            className={this.getClassName('teachers')}
          />
          <AdminStats
            teachers={teachers}
            admins={admins}
            school={school}
            showComponent={(component) => { this.setState({ ComponentToShow: component, nameComponent: 'admins' }); }}
            closeComponent={() => { this.setState({ ComponentToShow: null, nameComponent: null }); }}
            showingComponent={nameComponent === 'admins'}
            className={this.getClassName('admins')}
          />
          <GroupStats
            teachers={teachers}
            school={school}
            groups={groups}
            user={users}
            archivedGroups={archivedGroups}
            showComponent={(component) => { this.setState({ ComponentToShow: component, nameComponent: 'groups' }); }}
            closeComponent={() => { this.setState({ ComponentToShow: null, nameComponent: null }); }}
            showingComponent={nameComponent === 'groups'}
            className={this.getClassName('groups')}
          />
        </div>
        <div className={dynamicContentClassName}>
          {element}
        </div>
      </div>
    );
  }

  getClassName(nameComponent) {
    if (this.state.ComponentToShow === null) {
      return 'visible-list';
    }

    if (this.state.nameComponent === nameComponent) {
      return 'visible';
    }

    return 'invisible';
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminHomeComponent);
