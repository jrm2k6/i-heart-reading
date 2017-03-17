import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import GroupCreationForm from './forms/GroupCreationForm';
import ListGroups from './ListGroups';
import { createGroup, ERROR_GROUP_CREATED } from '../../actions/signup/signupSchoolGroupAction';


const mapStateToProps = (state) => {
  return {
    currentSchool: state.signupReducer.currentSchool,
    currentGroups: state.signupReducer.currentGroups
  };
};

const mapDispatchToProps= (dispatch) => {
  return {
    createGroup: (group) => dispatch(createGroup(group))
  };
}


class GroupCreationComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: [],
      showingForm: false,
      shouldShowError: false,
      currentError: null
    };

    this.handleAddNewClassroom = this.handleAddNewClassroom.bind(this);
    this.handleDeleteGroup = this.handleDeleteGroup.bind(this);
    this.handleSaveChanges = this.handleSaveChanges.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    if (this.props.currentGroups) {
      this.setState({ groups: this.props.currentGroups });
    }
  }

  render() {
    const creationForm = (this.state.showingForm) ?
      <GroupCreationForm handleValidate={this.handleValidate}
        handleCancel={this.handleCancel}
      />
      : <ListGroups groups={this.state.groups}
          deleteGroup={(i) => {this.handleDeleteGroup(i) }}
        />;

    const errorContainer = (this.state.shouldShowError) ? (
      <div className='error-container'>
        {this.state.currentError}
      </div>
    ) : null

    return (
      <div className='register-school-group-creation-container'>
        {errorContainer}
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

  isFailedRequest(res) {
    return res.type === ERROR_GROUP_CREATED;
  }

  getCurrentError(res) {
    let currentError = null;
    if (res.data !== null) {
      const data = res.data;
      const keys = Object.keys(data);

      if (keys.length > 0) {
        const firstKey = keys[0];
        const firstError = data[firstKey];

        if (firstError.length > 0) {
          currentError = firstError[0];
        }
      }
    }

    return currentError;
  }

  handleDeleteGroup(i) {
    const updatedGroups = this.state.groups.filter((group, index) => index !== i);
    this.setState({ groups: updatedGroups });
  }

  handleAddNewClassroom() {
    this.setState({ showingForm: !this.state.showingForm });
  }

  handleValidate(group) {
      let groupData = Object.assign({}, group, { schoolId: this.props.currentSchool.id });
      this.props.createGroup(groupData).then(
        res => {
          if (this.isFailedRequest(res)) {
            this.setState({
              shouldShowError: true,
              currentError: this.getCurrentError(res)
            });
          } else {
            const updatedGroups = this.state.groups.concat(group);
            this.setState({
              groups: updatedGroups,
              showingForm: false,
              shouldShowError: false,
              currentError: null
            });
          }
        }
      );
  }

  handleCancel() {
    this.setState({ showingForm: false });
  }

  handleSaveChanges() {
    browserHistory.push('/signup/verify');
  }

  handlePreviousClick() {
    browserHistory.push('/signup/contact')
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupCreationComponent);
