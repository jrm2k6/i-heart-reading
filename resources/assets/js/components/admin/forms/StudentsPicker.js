import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { createGroupTransfer,
  fetchStudentGroupsExcept
} from '../../../actions/admin/adminDashboardActions';

const mapStateToProps = (state) => {
  return {
    teachers: state.adminReducer.teachers,
    groups: state.adminReducer.groups
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudentGroupsExcept: (groupId) => dispatch(fetchStudentGroupsExcept(groupId)),
    loadStudentGroup: (groupId) => {

    }
  };
};


class StudentsPicker extends Component {
  constructor(props) {
      super(props);

      this.state = {
        selectedStudents: [],
        currentOptions: []
      };

      this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchStudentGroupsExcept(this.props.group.id);
  }

  getCurrentOptions() {
    if (this.props.groups) {
      return this.props.groups.filter(group => group.id !== this.props.group.id)
        .reduce((acc, current) => acc.concat(current.students), [])
        .filter(elem => elem !== undefined)
        .map(
          option => { return { value: option.id, label: option.name }; }
        );
    }

    return [];
  }

  handleInputChange(inputValue) {
    this.setState({ selectedStudents: inputValue });
  }

  render() {
    return (
      <Select
          name="student-picker-select"
          value={this.state.selectedStudents}
          options={this.getCurrentOptions()}
          noResultsText={'No Students Found!'}
          onChange={this.handleInputChange}
          multi={true}
          placeholder={'Find students'}
          searchPromptText={'Type to Search'}
      />
    );
  }
}

// <div className='student-picker-container'>
//   <div className='student-picker-select-control'>
//     <div className='student-picker-select-multi-value-wrapper'>
//       <input />
//     </div>
//     <div className='student-picker-select-clear'>
//     </div>
//     <div className='student-picker-select-arrow'>
//       <i className='material-icons'>keyboard_arrow_down</i>
//     </div>
//   </div>
//   <div className='student-picker-select-options'>
//   </div>
// </div>


export default connect(mapStateToProps, mapDispatchToProps)(StudentsPicker);
