import React from 'react';
import rd3 from 'rd3';
const PieChart = rd3.PieChart;

class ProgressPieChartComponent extends React.Component {
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

    switch (this.props.timeView) {
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
    switch (this.props.timeView) {
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
    const { stats } = this.props;
    const pieData = (Object.keys(stats).length > 0) ? this.getDataForView(stats) : [];
    return (
      <div className='home-component-container'>
        <div className='home-component-pie-chart-container'>
          <div className='home-component-pie-chart-header'>
            <span>My progress</span>
          </div>
          <div className='home-component-pie-chart'>
            <PieChart
              data={pieData}
              width={450}
              height={400}
              radius={110}
              innerRadius={70}
              showOuterLabels={false}
              showTooltip={false}
              sectorBorderColor='white'
              colors={this.getColors()}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ProgressPieChartComponent;
