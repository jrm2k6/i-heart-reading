import React, { Component } from 'react';
import DailyProgression from './stats/DailyProgression';
import WeeklyProgression from './stats/WeeklyProgression';
import MonthlyProgression from './stats/MonthlyProgression';
import YearlyProgression from './stats/YearlyProgression';
import StatsComponent from './stats/StatsComponent';
import { connect } from 'react-redux';
import { fetchStats } from '../actions/crudActions';


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

class HomeComponent extends Component {
  componentDidMount() {
    this.props.fetchStats();
  }

  render() {
    return (
      <div>
        <DailyProgression stats={this.props.stats.daily} />
        <MonthlyProgression stats={this.props.stats.monthly} />
        <YearlyProgression stats={this.props.stats.yearly} />
        <WeeklyProgression stats={this.props.stats.weekly} />
        <StatsComponent />
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
