import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import GroupCreationForm from './forms/GroupCreationForm';
import ListGroups from './ListGroups';
import { createGroup } from '../../actions/signup/signupSchoolGroupAction';

class GroupCreationComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: [],
      showingForm: false
    };

    this.handleAddNewClassroom = this.handleAddNewClassroom.bind(this);
    this.handleSaveChanges = this.handleSaveChanges.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
  }

  render() {
    let creationForm = (this.state.showingForm) ?
      <GroupCreationForm handleValidate={this.handleValidate} />
      : <ListGroups groups={this.state.groups} />;

    return (
      <div className='register-school-group-creation-container'>
        <div className='section-header'>
          Time to create your classrooms/groups
        </div>
        <div className='section-form'>
          <button onClick={this.handleAddNewClassroom}>
            Add a new classroom
          </button>
          <button onClick={this.handleSaveChanges}>
            Save Changes
          </button>
        </div>
        {creationForm}
      </div>
    );
  }

  handleAddNewClassroom() {
    this.setState({ showingForm: !this.state.showingForm });
  }

  handleValidate(group) {
      let groupData = Object.assign({}, group, { schoolId: this.props.currentSchool.id });
      this.props.createGroup(groupData).then(
        res => {
          const updatedGroups = this.state.groups.concat(group);
          this.setState({ groups: updatedGroups, showingForm: false });
        }
      );

  }

  handleSaveChanges() {
    browserHistory.push('/signup/verify');
  }
}

const mapStateToProps = (state) => {
  return {
    currentSchool: state.signupReducer.currentSchool
  };
};


const mapDispatchToProps= (dispatch) => {
  return {
    createGroup: (group) => dispatch(createGroup(group))
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(GroupCreationComponent);
