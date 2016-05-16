import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStats } from '../actions/crudActions';
import ProgressPieChartComponent from './stats/ProgressPieChartComponent';


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
  constructor(props) {
    super(props);
    this.state = {
      timeView: 'yearly'
    };
  }

  componentDidMount() {
    this.props.fetchStats();
  }

  getPercentageValue(valueToCheck, goal, max = 100) {
    let _value = Math.round(valueToCheck * max / goal);
    _value = (_value >= max) ? max : _value;
    const _remaining = (_value === max) ? 0 : max - _value;

    return {
      done: _value,
      remaining: _remaining
    };
  }

  getDataForView(stats) {
    let percentages = null;
    const goalDailyPages = 25;

    switch (this.state.timeView) {
      case 'daily':
        percentages = this.getPercentageValue(stats.daily.num_pages_read, goalDailyPages);

        return [{
          label: 'Pages read',
          value: percentages.done
        },
        {
          label: 'Pages to read',
          value: percentages.remaining
        }];

      case 'weekly':
        percentages = this.getPercentageValue(stats.weekly.num_pages_read, goalDailyPages);
        return [{
          label: 'Pages read',
          value: percentages.done
        },
        {
          label: 'Pages to read',
          value: percentages.remaining
        }];

      case 'monthly':
        percentages = this.getPercentageValue(stats.monthly.num_pages_read, goalDailyPages);
        return [{
          label: 'Pages read',
          value: percentages.done
        },
        {
          label: 'Pages to read',
          value: percentages.remaining
        }];

      case 'yearly':
        percentages = this.getPercentageValue(stats.yearly.num_pages_read, goalDailyPages);
        return [{
          label: 'Pages read',
          value: percentages.done
        },
        {
          label: 'Pages to read',
          value: percentages.remaining
        }];


      default:
        return {};
    }
  }

  getColors() {
    switch (this.state.timeView) {
      case 'daily':
        return idx => ['#ffc400', '#babec3'][idx];
      case 'weekly':
        return idx => ['#38a4dd', '#babec3'][idx];
      case 'monthly':
        return idx => ['#b39ddb', '#babec3'][idx];
      case 'yearly':
        return idx => ['#ffc400', '#babec3', '#b39ddb', '#babec3'][idx];
      default:
        return idx => ['#ffc400', '#babec3'][idx];
    }
  }

  render() {
    return (
      <div className='home-component-container'>
        <ProgressPieChartComponent
          stats={this.props.stats}
          timeView={this.state.timeView}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
