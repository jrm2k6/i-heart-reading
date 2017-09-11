import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    teachers: state.adminReducer.teachers
  };
};

class TeachersDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTeacherId: null
    };

    this.updateSelectedTeacher = this.updateSelectedTeacher.bind(this);
  }

  render() {
    return (
      <div>
        <span className='signup-form-label'>Grade/Type</span>
        <div className='admin-select-wrapper'>
          <span className='admin-select-arrow'>
            <i className='material-icons'>keyboard_arrow_down</i>
          </span>
          <select className='admin-form-select'
            value={this.state.selectedTeacherId}
            onChange={this.updateSelectedTeacher}
          >
            <option>Select a teacher</option>
            {this.props.teachers.map(teacher => {
              return (<option key={teacher.id} value={teacher.id}>{teacher.user.name}</option>);
            })}
          </select>
        </div>
      </div>
    );
  }

  updateSelectedTeacher(e) {
    const value = parseInt(e.target.value);
    this.setState({ selectedTeacherId: value }, (state) => {
      this.props.notifyParentForm(this.state.selectedTeacherId);
    });
  }
}


export default connect(mapStateToProps, function() { return {}})(TeachersDropdown);
