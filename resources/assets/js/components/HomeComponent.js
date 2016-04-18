import React from 'react';
import DailyProgression from './stats/DailyProgression';
import WeeklyProgression from './stats/WeeklyProgression';
import MonthlyProgression from './stats/MonthlyProgression';
import YearlyProgression from './stats/YearlyProgression';
import StatsComponent from './stats/StatsComponent';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
  return {
    progress: state.progressReducer.updates
  };
};

const mapDispatchToProps = () => {
  return {};
};

const HomeComponent = () => (
  <div>
    <YearlyProgression />
    <MonthlyProgression />
    <WeeklyProgression />
    <DailyProgression />
    <StatsComponent />
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
