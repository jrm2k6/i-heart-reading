import React from 'react';
import rd3 from 'rd3';
const PieChart = rd3.PieChart;

const NO_REMAINING_PAGES = 1;
const NO_REMAINING_BOOKS = 5;
const NO_READ_PAGES = 10;
const NO_FINISHED_BOOKS = 18;

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
        return this.getValues(percentages);

      case 'weekly':
        percentages = this.getPercentageValue(stats.weekly.num_pages_read, goalDailyPages * 7);
        return this.getValues(percentages);

      case 'monthly':
        percentages = this.getPercentageValue(stats.monthly.num_pages_read, goalDailyPages * 30);
        return this.getValues(percentages);

      case 'yearly':
        percentages = this.getPercentageValue(stats.yearly.num_pages_read, goalDailyPages * 365, 50);
        const percentagesBooks = this.getPercentageValue(stats.yearly.books_read, 35, 50);
        return this.getValues(percentages, percentagesBooks);

      default:
        return {};
    }
  }

  getValues(percentagesPages, percentagesBooks) {
    const defaultValues = [];
    let updateColorType = 0;

    if (percentagesPages.done > 0) {
      defaultValues.push({ label: 'Pages read', value: percentagesPages.done });
    } else {
      updateColorType += NO_READ_PAGES;
    }

    if (percentagesPages.remaining > 0) {
      defaultValues.push({ label: 'Pages read', value: percentagesPages.remaining });
    } else {
      updateColorType += NO_REMAINING_PAGES;
    }

    if (percentagesBooks) {
      if (percentagesBooks.remaining > 0) {
        defaultValues.push({ label: 'Books to read', value: percentagesBooks.remaining });
      } else {
        updateColorType += NO_REMAINING_BOOKS;
      }

      if (percentagesBooks.done > 0) {
        defaultValues.push({ label: 'Books read', value: percentagesBooks.done });
      } else {
        updateColorType += NO_FINISHED_BOOKS;
      }
    }

    return { values: defaultValues, colorUpdates: updateColorType };
  }

  /*
  * This helper will return the index to keep from the
  * colors array depending on the type of updates
  */
  getColorsFromUpdates(colorUpdates) {
    let indexes = [];

    switch (colorUpdates) {
      case NO_REMAINING_PAGES:
        if (this.props.timeView !== 'yearly') {
          indexes = [0];
        } else {
          indexes = [0, 1, 3];
        }
        break;

      case NO_REMAINING_BOOKS:
        indexes = [0, 2, 3];
        break;

      case NO_READ_PAGES:
        if (this.props.timeView !== 'yearly') {
          indexes = [1];
        } else {
          indexes = [0, 1, 2];
        }
        break;

      case NO_FINISHED_BOOKS:
        indexes = [1, 2, 3];
        break;

      case NO_REMAINING_PAGES + NO_REMAINING_BOOKS:
        indexes = [0, 3];
        break;

      case NO_REMAINING_PAGES + NO_FINISHED_BOOKS:
        indexes = [1, 3];
        break;

      case NO_READ_PAGES + NO_FINISHED_BOOKS:
        indexes = [1, 2];
        break;

      default:
        indexes = [];
        break;
    }

    const defaultColors = this.getColors();
    const colors = indexes.map(i => defaultColors[i]);

    return idx => colors[idx];
  }

  getColors() {
    switch (this.props.timeView) {
      case 'daily':
        return ['#ffc400', '#babec3'];
      case 'weekly':
        return ['#38a4dd', '#babec3'];
      case 'monthly':
        return ['#b39ddb', '#babec3'];
      case 'yearly':
        return ['#ffc400', '#babec3', '#babec3', '#b39ddb'];
      default:
        return ['#ffc400', '#babec3'];
    }
  }

  render() {
    const { stats } = this.props;
    const { values, colorUpdates } = (Object.keys(stats).length > 0) ?
        this.getDataForView(stats)
      : { values: [], colorUpdates: 0 };

    const colors = this.getColorsFromUpdates(colorUpdates);

    return (
      <div className='home-component-container'>
        <div className='home-component-pie-chart-container'>
          <div className='home-component-pie-chart-header'>
            <span>My progress</span>
          </div>
          <div className='home-component-pie-chart'>
            <PieChart
              data={values}
              width={450}
              height={400}
              radius={110}
              innerRadius={70}
              showOuterLabels={false}
              showTooltip={false}
              sectorBorderColor='white'
              colors={colors}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ProgressPieChartComponent;
