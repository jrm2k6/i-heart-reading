import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { createGroupTransfer,
  fetchStudentGroupsExcept,
  fetchStudentsGroup
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
    fetchStudentsGroup: (groupId) => dispatch(fetchStudentsGroup(groupId))
  };
};


class StudentsPicker extends Component {
  constructor(props) {
      super(props);

      this.state = {
        selectedStudents: []
      };

      this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.fetchStudents(this.props.onlyCurrentGroup);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.onlyCurrentGroup !== nextProps.onlyCurrentGroup) {
      this.setState({ selectedStudents: [] });
      this.fetchStudents(nextProps.onlyCurrentGroup);
    }
  }

  fetchStudents(onlyCurrentGroup) {
    if (onlyCurrentGroup) {
      this.props.fetchStudentsGroup(this.props.group.id);
    } else {
      this.props.fetchStudentGroupsExcept(this.props.group.id);
    }
  }

  getCurrentOptions() {
    if (this.props.groups) {
      const students = this.props.groups.filter(group => this.getPredicate(group.id, this.props.group.id))
        .reduce((acc, current) => acc.concat(current.students), [])
        .filter(elem => elem !== undefined)
        .map(
          option => { return { value: option.id, label: option.name }; }
        );

      return students;
    }

    return [];
  }

  getPredicate(id1, id2) {
    if (this.props.onlyCurrentGroup) {
      return id1 === id2;
    }

    return id1 !== id2;
  }

  handleInputChange(inputValue) {
    this.setState({ selectedStudents: inputValue }, () => {
      this.props.sendSelectedStudents(this.state.selectedStudents);
    });
  }

  render() {
    return (
      <Select
          className='student-picker-select'
          name='student-picker-select'
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

export default connect(mapStateToProps, mapDispatchToProps)(StudentsPicker);
