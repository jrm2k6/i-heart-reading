import React, { Component } from 'react';
import ItemProgression from '../stats/ItemProgression';
import StatsComponent from '../stats/StatsComponent';
import { connect } from 'react-redux';
import { fetchStats } from '../../actions/crudActions';


const mapStateToProps = (state) => {
  return {
    stats: state.progressReducer.stats
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStats: () => { dispatch(fetchStats()); }
  };
};

class TeacherHomeComponent extends Component {
  componentDidMount() {
    this.props.fetchStats();
  }

  render() {
    return (
      <div className='home-component-container'>
        Home Component
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherHomeComponent);
