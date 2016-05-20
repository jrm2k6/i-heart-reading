import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStats, fetchUpdates } from '../actions/crudActions';
import ProgressPieChartComponent from './stats/ProgressPieChartComponent';
import InteractiveChartLegend from './stats/InteractiveChartLegend';
import LatestUpdatesCard from './stats/LatestUpdatesCard';
import StatsCards from './stats/StatsCards';


const mapStateToProps = (state) => {
  return {
    stats: state.progressReducer.stats,
    updates: state.userProfileReducer.updates
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStats: () => { dispatch(fetchStats()); },
    fetchLatestUpdates: () => { dispatch(fetchUpdates()); }
  };
};

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeView: 'monthly'
    };
  }

  componentDidMount() {
    this.props.fetchStats();
    this.props.fetchLatestUpdates();
  }

  getYearlyObjective() {
    const YEARLY_OBJECTIVE = 35;
    const { stats } = this.props;

    if (stats.yearly) {
      const yearly = stats.yearly;
      const done = parseInt(yearly.books_read, 10);
      const percentage = Math.round(done * 100 / 35);

      return `${percentage}% - ${done} of ${YEARLY_OBJECTIVE} books`;
    }

    return '';
  }

  render() {
    const { stats, updates } = this.props;
    return (
      <div className='home-component-container'>
        <div className='home-component-left-section'>
          <StatsCards
            stats={stats}
            timeView={this.state.timeView}
          />
          <div className='home-component-pie-card'>
            <div className='home-component-pie-chart-header'>
              <span>My progress</span>
            </div>
            <div className='home-component-interactive-chart'>
              <ProgressPieChartComponent
                stats={stats}
                timeView={this.state.timeView}
              />
              <InteractiveChartLegend timeView={this.state.timeView} />
            </div>
          </div>
          <div className='yearly-objective'>
            <img src='images/icons/trophy.png' />
            <div className='description-objective'>
              <span className='description-objective-title'>
                Yearly Goal Progression
              </span>
              <span className='description-objective-content'>
                {this.getYearlyObjective()}
              </span>
            </div>
          </div>
        </div>
        <div className='home-component-right-section'>
          <LatestUpdatesCard latestUpdates={updates} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
