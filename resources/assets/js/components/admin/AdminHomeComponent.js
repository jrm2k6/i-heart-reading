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
          showComponent={(component) => { this.setState({ componentToShow: component }); }}
        />
        {this.state.componentToShow}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    adminUser: state.adminReducer.adminUser,
    teachers: state.adminReducer.teachers
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAdminUser: () => dispatch(fetchAdminUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHomeComponent);
