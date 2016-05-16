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
