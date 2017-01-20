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
        <div className='section-form group-creation'>
          <button className='add-new-classroom-button'
            onClick={this.handleAddNewClassroom}>
            Add a new classroom
          </button>
          {creationForm}
        </div>
        <div className='section-navigation'>
          <button className='section-navigation-btn previous-btn'
            onClick={this.handlePreviousClick}>
              Previous
          </button>
          <button className='section-navigation-btn continue-btn'
            onClick={this.handleSaveChanges}>
              Continue
          </button>
        </div>
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

  handlePreviousClick() {
    browserHistory.push('/signup/contact')
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
