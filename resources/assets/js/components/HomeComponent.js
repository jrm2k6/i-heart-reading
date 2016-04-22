import React, { Component } from 'react';
import ItemProgression from './stats/ItemProgression';
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
    const numPagesReadYear = (this.props.stats.yearly) ?
      this.props.stats.yearly.num_pages_read :
      0;
    return (
      <div className='home-component-container'>
        <ItemProgression stats={this.props.stats.daily} type='Today' />
        <ItemProgression stats={this.props.stats.weekly} type='This Week' />
        <ItemProgression stats={this.props.stats.monthly} type='This Month' />
        <ItemProgression stats={this.props.stats.yearly} type='This Year' />
        <StatsComponent numPagesReadYear={numPagesReadYear} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
