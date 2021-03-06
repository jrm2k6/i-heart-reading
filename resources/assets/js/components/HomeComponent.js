import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMyStats, fetchMyUpdates } from '../actions/crudActions';
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
    fetchStats: () => { dispatch(fetchMyStats()); },
    fetchLatestUpdates: () => { dispatch(fetchMyUpdates()); }
  };
};

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeView: 'yearly',
      hasDismissedFirstTimeUser: false
    };

    this.highlightFindBookItem = this.highlightFindBookItem.bind(this);
  }

  componentDidMount() {
    this.props.fetchStats();
    this.props.fetchLatestUpdates();
  }

  getYearlyObjective() {
    const YEARLY_OBJECTIVE = 35;
    const { stats } = this.props;

    if (stats && stats.yearly) {
      const yearly = stats.yearly;
      const done = parseInt(yearly.books_read, 10);
      const percentage = Math.round(done * 100 / 35);

      return `${percentage}% - ${done} of ${YEARLY_OBJECTIVE} books`;
    }

    return '';
  }

  getPieComponent() {
    return (
      <div>
        <div className='home-component-pie-chart-header'>
          <span>My progress</span>
          <div className='home-component-timeview-select-container'>
            <select
              className='home-component-timeview-select'
              value={this.state.timeView}
              onChange={(e) => { this.setState({ timeView: e.target.value }); }}
            >
              <option value='daily'>Daily View</option>
              <option value='weekly'>Weekly View</option>
              <option value='monthly'>Monthly View</option>
              <option value='yearly'>Yearly View</option>
            </select>
          </div>
        </div>
        <div className='home-component-interactive-chart'>
          <ProgressPieChartComponent
            stats={this.props.stats}
            timeView={this.state.timeView}
          />
          <InteractiveChartLegend timeView={this.state.timeView} />
        </div>
      </div>
    );
  }

  render() {
    const { stats, updates } = this.props;
    const component = (stats.length > 0 && updates.length > 0 || this.state.hasDismissedFirstTimeUser) ?
      this.getUserHome(stats, updates) :
      this.getFirstTimeUserHome();

    return component;
  }

  highlightFindBookItem() {
    console.log('run function')
    $('.find-book-menu-item').addClass('glowing');
  }

  getFirstTimeUserHome() {
    return (
      <div className='home-component-container'>
        <div className='first-time-user'>
          <div className='first-time-user-welcome'>Welcome!</div>
          <div>It looks like you are new here.</div>
          <div>To get started, find a book to read!</div>

          <div className='first-time-user-actions-container'>
            <button className='first-time-user-no-help-button'
              onClick={() => {this.setState({ hasDismissedFirstTimeUser: true }); }}
            >
              No Thanks
            </button>
            <button className='first-time-user-help-button'
              onClick={() => { this.highlightFindBookItem(); }}
            >
              Show me how
            </button>
          </div>
        </div>
      </div>
    )
  }

  getUserHome(stats, updates) {
    return (
      <div className='home-component-container'>
        <div className='home-component-left-section'>
          <StatsCards
            stats={stats}
            timeView={this.state.timeView}
          />
          <div className='home-component-pie-card'>
            {this.getPieComponent()}
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
